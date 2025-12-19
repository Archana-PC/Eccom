# catalog/serializers.py
from rest_framework import serializers
from ..models import Category, Brand, Product, ProductVariant, ProductImage,Color,Collection,Fabric,Material


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "category_type",
            "requires_fabric",
            "requires_fit",
            "requires_size_chart",
            "display_order",
            "description",
        ]

class CategoryTreeSerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "is_active",
            "subcategories",
        ]
    
    def get_subcategories(self, obj):
        # Get all immediate children
        children = obj.children.filter(is_active=True)
        if children.exists():
            return CategoryTreeSerializer(children, many=True).data
        return []

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id", "name", "slug", "is_active"]

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = [
            "id",
            "name",
            "slug",
            "is_active",
        ]

class FabricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabric
        fields = "__all__"

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [
            "id",
            "image",
            "alt_text",
            "is_main",
            "sort_order",
        ]


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "slug", "hex_code", "is_active"]


class SimpleColorSerializer(serializers.ModelSerializer):
    """
    Compact color representation for nesting inside ProductVariant.
    """
    class Meta:
        model = Color
        fields = ["id", "name", "slug", "hex_code"]


class ProductVariantSerializer(serializers.ModelSerializer):
    color = SimpleColorSerializer(read_only=True)
    color_id = serializers.PrimaryKeyRelatedField(
        queryset=Color.objects.all(),
        source="color",
        write_only=True,
    )

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "sku",
            "color",
            "color_id",
            "size",
            "price",
            "compare_at_price",
            "stock_qty",
            "is_active",
        ]
        read_only_fields = ("sku",)

            
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source="category.name")
    brand_name = serializers.ReadOnlyField(source="brand.name")
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "category_name",
            "brand",
            "brand_name",

            # 👇 PRODUCT-LEVEL ATTRIBUTES
            "fabric",
            "fabric_composition",
            "fit",
            "size_chart_image",
            "size_chart_description",
            "measurements",
            "style_code",
            "collar_type",
            "sleeve_type",
            "pattern",
            "material",
            "dimensions",

            "description",
            "base_price",
            "is_active",

            "meta_title",
            "meta_description",

            "variants",
            "images",
        ]

  
