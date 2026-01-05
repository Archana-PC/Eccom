from django.core.management.base import BaseCommand
from django.utils.text import slugify
from catalog.models import Category


class Command(BaseCommand):
    help = "Seed categories and subcategories (Men-only brand, no MEN parent)"

    def handle(self, *args, **options):

        categories = {
            "Shirts": [
                "Solid Shirts",
                "Printed Shirts",
                "Checks Shirts",
                "Striped Shirts",
                "Resort Shirts",
                "Linen Shirts",
                "Formal Shirts",
                "Plus Size Shirts",
            ],
            "Trousers": [
                "Plain Pants",
                "Dobby Pants",
                "Structured Pants",
                "Checked Pants",
                "Striped Pants",
                "Chinos",
                "Formal Pants",
                "Plus Size Pants",
            ],
            "Jeans": [
                "Slim Jeans",
                "Ankle Jeans",
                "Slim Stretch",
                "Slim Tapered",
                "Baggy Jeans",
                "Barrel Jeans",
            ],
            "Cargos": [
                "Regular Cargo",
                "Smart Cargo",
                "Slim Cargo",
                "Baggy Cargos",
            ],
            "T-Shirts": [
                "Crew Neck Tees",
                "V-Neck Tees",
                "Full Sleeve Tees",
                "Graphic Tees",
                "Oversized Tees",
                "Relaxed Tees",
            ],
            "Polos": [
                "Solid Polo",
                "Striped Polo",
                "Printed Polo",
                "Dobby Polo",
            ],
            "Sweatshirts": [
                "Graphic Sweatshirts",
                "Fleece Sweatshirts",
            ],
            "Hoodies": [
                "Pullover Hoodies",
                "Zipper Hoodies",
            ],
            "Track Pants": [
                "Slim Tracks",
                "Regular Tracks",
                "Relaxed Tracks",
            ],
            "Shorts": [
                "Regular Shorts",
                "Cargo Shorts",
                "Stretch Shorts",
            ],
            "Shackets": [
                "Shackets",
            ],
            "Jackets": [
                "Jackets",
            ],
        }

        for category_name, subcategories in categories.items():
            category_slug = slugify(category_name)

            category, created = Category.objects.get_or_create(
                slug=category_slug,
                defaults={
                    "name": category_name,
                    "parent": None,
                    "is_active": True,
                },
            )

            self.stdout.write(
                self.style.SUCCESS(f"Category: {category.name}")
                if created
                else f"Category exists: {category.name}"
            )

            for sub in subcategories:
                sub_slug = slugify(f"{category_name}-{sub}")

                Category.objects.get_or_create(
                    slug=sub_slug,
                    defaults={
                        "name": sub,
                        "parent": category,
                        "is_active": True,
                    },
                )

        self.stdout.write(self.style.SUCCESS("✅ Categories seeded successfully"))
