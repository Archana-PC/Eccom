
from django.urls import path
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

from django.utils.html import format_html

from django.contrib import admin
from .models import Category, Brand, Product, ProductVariant, ProductImage,Color,Collection,Fabric,Material

from approval_engine.models import Workflow, ApprovalInstance
from approval_engine.utils import has_pending_approval



class CategoryLevelFilter(admin.SimpleListFilter):
    title = "Category Level"
    parameter_name = "level"

    def lookups(self, request, model_admin):
        return (
            ("main", "Main Categories"),
            ("sub", "Sub Categories"),
        )

    def queryset(self, request, queryset):
        if self.value() == "main":
            return queryset.filter(parent__isnull=True)
        if self.value() == "sub":
            return queryset.filter(parent__isnull=False)
        return queryset
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
     list_display = (
        "name",
        "parent",
        "category_type",
        "requires_fabric",
        "requires_fit",
        "requires_size_chart",
        "display_order",
        "is_active",
    )
     list_filter = (CategoryLevelFilter, "category_type", "is_active")
     search_fields = ("name",)
     ordering = ("display_order", "name")
     prepopulated_fields = {"slug": ("name",)}
     def indented_name(self, obj):
        """
        Show clean indented category tree in admin.
        """
        depth = 0
        parent = obj.parent

        while parent:
            depth += 1
            parent = parent.parent

        # Use non-breaking spaces for indentation
        indent = "&nbsp;" * (depth * 4)

        # Use an arrow for child categories
        prefix = "↳ " if depth > 0 else ""

        return format_html(f"{indent}{prefix}{obj.name}")

     indented_name.short_description = "Category"

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "hex_code", "color_preview", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "slug", "hex_code")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("name",)

    fieldsets = (
        (None, {
            "fields": ("name", "slug", "hex_code", "is_active"),
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
        }),
    )

    @admin.display(description="Preview")
    def color_preview(self, obj):
        """
        Show a small color box using hex_code.
        """
        if obj.hex_code:
            return format_html(
                '<div style="width: 24px; height: 24px; border-radius: 4px; '
                'border: 1px solid #ccc; background-color: {}; display: inline-block;"></div>',
                obj.hex_code,
            )
        return "-"

    def save_model(self, request, obj, form, change):
        # Ensure name is normalized even from admin
        obj.name = obj.name.strip().title()
        super().save_model(request, obj, form, change)


@admin.register(Fabric)
class FabricAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_natural",
        "is_stretch",
        "weight",
        "is_active",
    )
    list_filter = ("is_natural", "is_stretch", "weight")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ("name", "material_type", "is_active")
    list_filter = ("material_type",)
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fields = (
        "sku",
        "color",
        "size",
        "price",
        "compare_at_price",
        "stock_qty",
        "is_active",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "brand",
        "is_active",
        "is_featured",
        "is_best_seller",
        "show_on_home",
        "submit_for_approval_button",
    )

    list_filter = (
    "is_active",
    "is_featured",
    "is_best_seller",
    "show_on_home",
    "category",
    )

    fieldsets = (
    ("Basic Info", {
        "fields": (
            "name",
            "category",
            "brand",
            "is_active",
        )
    }),
    ("Home Page Settings", {
        "fields": (
            "show_on_home",
            "is_featured",
            "is_best_seller",
        )
    }),
    ("SEO", {
        "fields": (
            "meta_title",
            "meta_description",
        )
    }),
)

    
    inlines = (ProductVariantInline, ProductImageInline)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "submit-approval/<uuid:product_id>/",  # ✅ FIX HERE
                self.admin_site.admin_view(self.submit_for_approval),
                name="product-submit-approval",
            ),
        ]
        return custom_urls + urls


    def submit_for_approval_button(self, obj):
        if obj.is_active:
            return "✅ Live"

        if has_pending_approval(obj):
            return "⏳ Pending Approval"

        return format_html(
            '<a class="button" href="{}">Submit for Approval</a>',
            f"submit-approval/{obj.pk}/"
        )

    def submit_for_approval(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)

        if product.is_active:
            messages.error(request, "Product is already live.")
            return redirect(request.META.get("HTTP_REFERER"))

        if has_pending_approval(product):
            messages.warning(request, "Approval already in progress.")
            return redirect(request.META.get("HTTP_REFERER"))

         # ✅ ADD TRY/EXCEPT HERE
        try:
            workflow = Workflow.objects.get(code="PRODUCT_LIVE_APPROVAL")
        except Workflow.DoesNotExist:
            messages.error(
                request,
                "Approval workflow is not configured. Please contact admin."
            )
            return redirect(request.META.get("HTTP_REFERER"))

        first_step = workflow.steps.order_by("order").first()
        if not first_step:
            messages.error(
                request,
                "Approval workflow has no steps configured. Please contact admin."
            )
            return redirect(request.META.get("HTTP_REFERER"))

        ApprovalInstance.objects.create(
            workflow=workflow,
            entity_type="product",
            entity_id=product.id,
            entity_ref=product.slug or str(product.id),
            current_step=first_step,
            created_by=request.user,
        )

        messages.success(request, "Product submitted for approval.")
        return redirect(request.META.get("HTTP_REFERER"))


    def get_readonly_fields(self, request, obj=None):
        if obj and has_pending_approval(obj):
            return [f.name for f in obj._meta.fields]
        return super().get_readonly_fields(request, obj)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        user = request.user
        role_group = getattr(user, "role_group", None)

        # Superuser or manager → all products
        if user.is_superuser or (role_group and role_group.category is None):
            return qs

        # Category restricted user
        if role_group and role_group.category:
            return qs.filter(category=role_group.category)

        return qs.none()

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        user = request.user
        role_group = getattr(user, "role_group", None)

        if db_field.name == "category":

            # Superuser or manager → all categories
            if user.is_superuser or (role_group and role_group.category is None):
                return super().formfield_for_foreignkey(db_field, request, **kwargs)

            # Category restricted user → ONLY their category
            if role_group and role_group.category:
                kwargs["queryset"] = Category.objects.filter(
                    id=role_group.category.id
                )
                return super().formfield_for_foreignkey(db_field, request, **kwargs)

        return super().formfield_for_foreignkey(db_field, request, **kwargs)