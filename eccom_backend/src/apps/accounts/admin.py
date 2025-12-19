# src/apps/accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, AdminRole


# ===========================================================
# AdminRole Admin
# ===========================================================

@admin.register(AdminRole)
class AdminRoleAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "role",
        "category",
        "is_active",
        "created_at",
    )
    list_filter = (
        "role",
        "category",
        "is_active",
    )
    search_fields = (
        "name",
        "role",
    )
    filter_horizontal = ("permissions",)


# ===========================================================
# User Admin
# ===========================================================

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("email",)

    list_display = (
        "email",
        "full_name",
        "employee_id",
        "role_group",
        "is_staff",
        "is_active",
    )

    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        "role_group",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "last_login",
    )

    fieldsets = (
        (_("Login Info"), {
            "fields": (
                "email",
                "password",
            )
        }),
        (_("Personal Info"), {
            "fields": (
                "full_name",
                "employee_id",
            )
        }),
        (_("Role & Access"), {
            "fields": (
                "role_group",
            )
        }),
        (_("Permissions"), {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
        (_("Important Dates"), {
            "fields": (
                "last_login",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "employee_id",
                "full_name",
                "role_group",
                "password1",
                "password2",
                "is_staff",
                "is_active",
            ),
        }),
    )

    search_fields = (
        "email",
        "employee_id",
        "full_name",
    )

    filter_horizontal = (
        "groups",
        "user_permissions",
    )
