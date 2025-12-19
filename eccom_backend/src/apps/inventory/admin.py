from django.contrib import admin
from .models import InventoryStyle
from .services import start_inventory_approval


@admin.register(InventoryStyle)
class InventoryStyleAdmin(admin.ModelAdmin):
    list_display = ("style_code", "category", "status", "created_by")

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
            obj.status = "UNDER_APPROVAL"
            super().save_model(request, obj, form, change)

            # 🔥 trigger approval automatically
            start_inventory_approval(obj, request.user)
        else:
            super().save_model(request, obj, form, change)
    