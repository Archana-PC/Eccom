from django.core.management.base import BaseCommand
from catalog.models import ProductImage
from core.utils import resize_image, IMAGE_SIZES
import os

class Command(BaseCommand):
    help = "Generate thumb/card/zoom images safely (SQLite friendly)"

    def handle(self, *args, **kwargs):
        images = ProductImage.objects.all()
        total_created = 0

        for img in images:
            if not img.image:
                continue

            base_name = os.path.splitext(os.path.basename(img.image.name))[0]

            for size_name, (width, quality) in IMAGE_SIZES.items():
                path = f"products/{size_name}/{base_name}_{size_name}.webp"

                if img.image.storage.exists(path):
                    continue

                resized = resize_image(img.image, width, quality)
                img.image.storage.save(path, resized)
                total_created += 1

                self.stdout.write(self.style.SUCCESS(f"Created: {path}"))

        self.stdout.write(self.style.SUCCESS(f"Done. Created {total_created} files."))
