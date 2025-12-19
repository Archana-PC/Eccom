from django.db import models
from django.conf import settings
from catalog.models import Category


class InventoryStyle(models.Model):
    style_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)

    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    status = models.CharField(
        max_length=20,
        choices=[
            ("DRAFT", "Draft"),
            ("UNDER_APPROVAL", "Under Approval"),
            ("APPROVED", "Approved"),
        ],
        default="DRAFT",
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.style_code
