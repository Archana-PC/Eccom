from django.core.management.base import BaseCommand
from django.utils.text import slugify
from decimal import Decimal
import random

from catalog.models import (
    Category,
    Brand,
    Product,
    ProductVariant,
    Color
)


class Command(BaseCommand):
    help = "Seed categories with products & variants"

    def handle(self, *args, **kwargs):
        self.stdout.write("🌱 Seeding catalog data...")

        # -----------------------------
        # 1️⃣ Categories map
        # -----------------------------
        category_map = {
            "Cargos": {"slug": "cargos", "products_prefix": "Cargo Pant"},
            "Hoodies": {"slug": "hoodies", "products_prefix": "Hoodie"},
            "T-Shirts": {"slug": "tshirts", "products_prefix": "T-Shirt"},
            "Shirts": {"slug": "shirts", "products_prefix": "Shirt"},
        }

        categories = {}

        for name, data in category_map.items():
            category, _ = Category.objects.get_or_create(
                name=name,
                defaults={
                    "slug": data["slug"],
                    "is_active": True,
                },
            )
            categories[name] = category

        # -----------------------------
        # 2️⃣ Brand
        # -----------------------------
        brand, _ = Brand.objects.get_or_create(
            name="Urban Wear",
            defaults={"is_active": True},
        )

        # -----------------------------
        # 3️⃣ Colors
        # -----------------------------
        colors = []
        for color_name in ["Black", "Olive", "Khaki", "Grey"]:
            color, _ = Color.objects.get_or_create(name=color_name)
            colors.append(color)

        sizes = ["S", "M", "L", "XL", "XXL"]

        # -----------------------------
        # 4️⃣ Products per category
        # -----------------------------
        for category_name, parent_category in categories.items():

            subcategories = Category.objects.filter(parent=parent_category)
            prefix = category_map[category_name]["products_prefix"]

            for subcategory in subcategories:
                for i in range(1, 6):

                    product_name = f"{prefix} {i}"
                    product_slug = slugify(f"{subcategory.slug}-{i}")

                    product, created = Product.objects.get_or_create(
                        slug=product_slug,
                        defaults={
                            "name": product_name,
                            "category": subcategory,  # ✅ SUBCATEGORY
                            "brand": brand,
                            "base_price": Decimal(random.randint(999, 2499)),
                            "is_active": True,
                            "show_on_home": True,
                            "description": f"Premium {product_name}",

                            "is_new_arrival": i <= 2,
                            "is_featured": 3 <= i <= 4,
                            "is_best_seller": i == 5,
                        },
                    )



                if not created:
                    # 🔥 UPDATE home flags for existing products
                    product.show_on_home = True
                    product.is_new_arrival = i <= 4
                    product.is_featured = 5 <= i <= 8
                    product.is_best_seller = 9 <= i <= 12
                    product.save()
                    continue

                # -----------------------------
                # 5️⃣ Variants with pricing
                # -----------------------------
                for size in random.sample(sizes, 3):
                    for color in random.sample(colors, 2):

                        selling_price = product.base_price + Decimal(
                            random.randint(0, 300)
                        )

                        mrp_price = selling_price + Decimal(
                            random.randint(300, 800)
                        )

                        ProductVariant.objects.create(
                            product=product,
                            color=color,
                            size=size,
                            price=selling_price,
                            compare_at_price=mrp_price,
                            stock_qty=random.randint(10, 100),
                            is_active=True,
                        )

        self.stdout.write(
            self.style.SUCCESS("✅ Multi-category seeding completed successfully")
        )
