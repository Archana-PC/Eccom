# src/apps/accounts/models.py
from django.db import models,transaction, IntegrityError
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
    Permission,
)
from django.utils import timezone
import uuid

from core.models import BaseModel   # your TimeStamped + UUID + SoftDelete
from catalog.models import Category
from django.db.models import Max, IntegerField
from django.db.models.functions import Cast, Substr


# ===========================================================
# ROLE DEFINITIONS (matches your business)
# ===========================================================

ROLE_CHOICES = [
    ("super_admin", "Super Admin"),
    ("admin", "Admin"),

    ("concept_design_manager", "Concept & Design Manager"),
    ("tech_designer", "Tech Designer"),

    ("procurement_merchant", "Procurement Merchant"),

    ("ecom_operations_manager", "E-Com Operations Manager"),
    ("ecom_uploader", "E-Com Product Uploader"),

    ("logistics_manager", "Logistics & Supply Chain Manager"),
    ("warehouse_staff", "Warehouse Staff"),

    ("accounts_manager", "Accounts Manager"),

    # Public Users
    ("customer", "Customer"),
]


# ===========================================================
# User Manager
# ===========================================================

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create normal user with email as username.
        """
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        # is_active comes from BaseModel (SoftDeleteModel) but we also
        # want default True when creating users
        extra_fields.setdefault("is_active", True)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user


# ===========================================================
# AdminRole – dynamic permission group per Role
# ===========================================================

class AdminRole(BaseModel):
    """
    Permission + Category aware role.
    If category is NULL → manager / global role.
    If category is set → category-restricted role.
    """

    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        help_text="Business role type (ecom_uploader, manager, etc.)",
    )

    # ✅ ADD THIS FIELD
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="admin_roles",
        help_text="NULL = all categories (manager). Set = restricted to one category.",
    )

    name = models.CharField(
        max_length=120,
        help_text="Example: E-Com Uploader (Shirts)",
    )

    permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name="admin_roles",
    )

    class Meta:
        verbose_name = "Admin Role"
        verbose_name_plural = "Admin Roles"
        ordering = ["role", "category", "name"]
        unique_together = ("role", "category")  # 🔐 important

    def __str__(self):
        if self.category:
            return f"{self.name} ({self.category.name})"
        return self.name



# ===========================================================
# Custom User
# ===========================================================

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Core user model with:
      - email login
      - business role (ROLE_CHOICES)
      - AdminRole (permission group)
      - allowed_categories (category-scoped access)
    """

    # LOGIN
    email = models.EmailField(unique=True)

    # BASIC INFO
    full_name = models.CharField(max_length=255, blank=True)
    employee_id = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True,
        help_text="Employee ID from HR/Company system.",
    )

    # BUSINESS ROLE
    # role = models.CharField(
    #     max_length=50,
    #     choices=ROLE_CHOICES,
    #     default="warehouse_staff",
    # )

    # LINK TO ROLE PERMISSION GROUP
    role_group = models.ForeignKey(
        AdminRole,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
        help_text="Select a role-group to auto-attach permissions.",
    )

    # CATEGORY-SCOPED ACCESS (important for designers / e-com / warehouse)
    # allowed_categories = models.ManyToManyField(
    #     Category,
    #     blank=True,
    #     related_name="users_with_access",
    #     help_text="User can work only with these product categories.",
    # )

    # ADMIN FLAGS
    is_staff = models.BooleanField(
        default=False,
        help_text="Can log into Django admin."
    )
    # is_active comes from BaseModel (SoftDeleteModel)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-created_at"]

    def __str__(self):
        if self.role_group:
            if self.role_group.category:
                return f"{self.email} [{self.role_group.role} - {self.role_group.category.name}]"
            return f"{self.email} [{self.role_group.role}]"
        return self.email


    # -------------------------------------------------------
    # Permission helpers
    # -------------------------------------------------------
    @property
    def all_permissions(self):
        """
        Returns union of:
          - direct user permissions
          - role_group permissions
        """
        direct = set(self.user_permissions.all())
        role_perms = set(self.role_group.permissions.all()) if self.role_group else set()
        return direct.union(role_perms)

    def has_perm(self, perm, obj=None):
        """
        Combine Django's PermissionsMixin + role_group permissions.
        """
        # superusers skip checks
        if self.is_superuser:
            return True

        # direct permissions via PermissionsMixin (groups + user_permissions)
        if super().has_perm(perm, obj=obj):
            return True

        # role_group permissions
        if self.role_group and self.role_group.permissions.filter(codename=perm.split(".")[-1]).exists():
            return True

        return False

    def has_module_perms(self, app_label):
        """
        Allow seeing an app if user has any perms in that app or is superuser.
        """
        if self.is_superuser:
            return True

        # check in role_group
        if self.role_group and self.role_group.permissions.filter(content_type__app_label=app_label).exists():
            return True

        return super().has_module_perms(app_label)
    def save(self, *args, **kwargs):
        # normalize empty string
        if self.employee_id == "":
            self.employee_id = None

        if self.is_staff and not self.employee_id:
            for _ in range(3):  # retry in rare race conditions
                with transaction.atomic():
                    qs = User.objects.select_for_update().filter(employee_id__startswith="EMP-")

                    max_num = (
                        qs.annotate(num=Cast(Substr("employee_id", 5), IntegerField()))
                          .aggregate(m=Max("num"))
                          .get("m")
                    ) or 0

                    self.employee_id = f"EMP-{max_num + 1:04d}"

                    try:
                        return super().save(*args, **kwargs)
                    except IntegrityError:
                        self.employee_id = None
                        continue

        return super().save(*args, **kwargs)