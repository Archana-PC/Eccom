import os
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProductImage
from core.utils import resize_image, IMAGE_SIZES


@receiver(post_save, sender=ProductImage)
def generate_product_image_sizes(sender, instance, created, **kwargs):
    """
    Generate thumb, card, zoom AFTER image is saved
    Works for admin, API, seeders
    """

    if not instance.image:
        return

    base_name = os.path.splitext(os.path.basename(instance.image.name))[0]

    for size_name, (width, quality) in IMAGE_SIZES.items():
        path = f"products/{size_name}/{base_name}_{size_name}.webp"

        # Skip if already exists (important)
        if instance.image.storage.exists(path):
            continue

        resized = resize_image(instance.image, width, quality)
        instance.image.storage.save(path, resized)
