from django.core.management.base import BaseCommand
from catalog.models import Category
from core.utils import resize_image, CATEGORY_IMAGE_SIZES
import os

class Command(BaseCommand):
    help = "Generate optimized category images (circle-ready)"

    def handle(self, *args, **kwargs):
        categories = Category.objects.filter(parent__isnull=True)
        total_created = 0

        for category in categories:
            if not category.image:
                continue

            base_name = os.path.splitext(
                os.path.basename(category.image.name)
            )[0]

            for size_name, (width, quality) in CATEGORY_IMAGE_SIZES.items():
                path = f"categories/{size_name}/{base_name}_{size_name}.webp"

                if category.image.storage.exists(path):
                    continue

                resized = resize_image(category.image, width, quality)
                category.image.storage.save(path, resized)
                total_created += 1

                self.stdout.write(
                    self.style.SUCCESS(f"Created: {path}")
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {total_created} category images."
            )
        )
