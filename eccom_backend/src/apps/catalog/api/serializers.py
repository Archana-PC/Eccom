# catalog/serializers.py
from rest_framework import serializers
from ..models import Category, Brand, Product, ProductVariant, ProductImage,Color,Collection,Fabric,Material,ProductImage,Style
import os
from rest_framework import serializers
import json

class CategorySerializer(serializers.ModelSerializer):
    image_thumb = serializers.SerializerMethodField()
    is_root = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "is_root",
            "image_thumb",
        ]

    def get_is_root(self, obj):
        return obj.parent is None

    def get_image_thumb(self, obj):
        if obj.image:
            return self.context["request"].build_absolute_uri(obj.image.url)
        return None
    
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
    
class ProductCardSerializer(serializers.ModelSerializer):
    starting_price = serializers.SerializerMethodField()
    mrp = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()

    brand_name = serializers.ReadOnlyField(source="brand.name")
    category_name = serializers.ReadOnlyField(source="category.name")
    image = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "starting_price",
            "mrp",
            "discount_percent",
            "brand_name",
            "category_name",
            "image",
            "badge"
        ]

    def get_badge(self, obj):
        if obj.is_new_arrival:
            return "NEW"
        if obj.is_featured:
            return "FEATURED"
        if obj.is_best_seller:
            return "TRENDING"
        return None


    def get_starting_price(self, obj):
        prices = obj.variants.filter(
            is_active=True,
            stock_qty__gt=0
        ).values_list("price", flat=True)

        return min(prices) if prices else obj.base_price

    def get_mrp(self, obj):
        mrps = obj.variants.filter(
            is_active=True,
            compare_at_price__isnull=False
        ).values_list("compare_at_price", flat=True)

        return max(mrps) if mrps else None

    def get_discount_percent(self, obj):
        start = self.get_starting_price(obj)
        mrp = self.get_mrp(obj)

        if start and mrp and mrp > start:
            return int(((mrp - start) / mrp) * 100)

        return 0

    def get_image(self, obj):
        image = obj.images.filter(is_main=True).first() or obj.images.first()
        if not image:
            return None

        base = image.image.name.rsplit("/", 1)[-1].split(".")[0]
        return image.image.storage.url(
            f"products/thumb/{base}_thumb.webp"
        )



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
    thumb = serializers.SerializerMethodField()
    card = serializers.SerializerMethodField()
    zoom = serializers.SerializerMethodField()

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True,
        required=True,
    )
    image = serializers.ImageField(write_only=True, required=True)


    class Meta:
        model = ProductImage
        fields = [
            "id",
            "product_id",   
            "image",
            "thumb",
            "card",
            "zoom",
            "alt_text",
            "is_main",
            "sort_order",
        ]

    def _build_url(self, obj, size):
        """
        Build URL using the EXACT stored filename
        """
        original_path = obj.image.name
        base, _ = os.path.splitext(original_path)
        thumb_path = f"{base}_{size}.webp"
        return obj.image.storage.url(thumb_path)

    def get_thumb(self, obj):
        return self._build_url(obj, "thumb")

    def get_card(self, obj):
        return self._build_url(obj, "card")

    def get_zoom(self, obj):
        return self._build_url(obj, "zoom")



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

class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ["id", "name", "slug", "code", "description", "is_active"]

class ProductVariantSerializer(serializers.ModelSerializer):
    color = SimpleColorSerializer(read_only=True)
    color_id = serializers.PrimaryKeyRelatedField(
        queryset=Color.objects.all(),
        source="color",
        write_only=True,
    )

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True,
        required=True,
    )
    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "product_id",
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

    style = serializers.PrimaryKeyRelatedField(
    queryset=Style.objects.filter(is_active=True),
    required=False,
    allow_null=True
)
    style_name = serializers.ReadOnlyField(source="style.name")

    collections = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Collection.objects.filter(is_active=True),
        required=False
    )
    collection_names = serializers.SerializerMethodField()
    material = serializers.PrimaryKeyRelatedField(
    queryset=Material.objects.filter(is_active=True),
    required=False,
    allow_null=True
)


    # allow blank so frontend can send ""

    fabric_composition = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    style_code = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    measurements = serializers.JSONField(required=False)
    dimensions = serializers.JSONField(required=False)
    

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
            "style",
            "style_name",
            "collections",
            "collection_names",
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

    def create(self, validated_data):
        collections = validated_data.pop("collections", [])
        product = super().create(validated_data)
        product.collections.set(collections)  # ✅ multiple collections
        return product

    def update(self, instance, validated_data):
        collections = validated_data.pop("collections", None)
        instance = super().update(instance, validated_data)

        # ✅ only update collections if request sent it
        if collections is not None:
            instance.collections.set(collections)

        return instance
    def get_collection_names(self, obj):
        return [c.name for c in obj.collections.all()]
    def _parse_json_if_string(self, value, field_name):
        if value in ("", None):
            return {}
        if isinstance(value, str):  # multipart sends string
            try:
                return json.loads(value)
            except Exception:
                raise serializers.ValidationError(f"Invalid JSON for {field_name}")
        return value
    def validate_measurements(self, value):
        value = self._parse_json_if_string(value, "measurements")

        # optional: if frontend sends rows array directly, wrap it
        if isinstance(value, list):
            return {"rows": value}

        if value in (None, ""):
            return {}
        if not isinstance(value, dict):
            raise serializers.ValidationError("measurements must be an object (dict)")

        # optional sanity checks for men size chart structure
        rows = value.get("rows", [])
        if rows and not isinstance(rows, list):
            raise serializers.ValidationError("measurements.rows must be a list")

        return value

    def validate_dimensions(self, value):
        value = self._parse_json_if_string(value, "dimensions")
        if value in (None, ""):
            return {}
        if not isinstance(value, dict):
            raise serializers.ValidationError("dimensions must be an object (dict)")
        return value
    def validate(self, attrs):
            instance = getattr(self, "instance", None)

            # ✅ pick fabric from incoming data, else existing instance
            fabric = attrs.get("fabric") if "fabric" in attrs else (getattr(instance, "fabric", None) if instance else None)

            # ✅ Auto-fill fabric_composition ONLY when user did not send it
            # - on create: if not provided, fill from fabric.composition
            # - on update: if fabric changed and fabric_composition not provided, fill from new fabric.composition
            if fabric and "fabric_composition" not in attrs:
                attrs["fabric_composition"] = getattr(fabric, "composition", "") or ""

            # ⚠️ Optional: if you want style_code default from Style.code ONLY when not provided:
            # style = attrs.get("style") if "style" in attrs else (getattr(instance, "style", None) if instance else None)
            # if style and "style_code" not in attrs:
            #     attrs["style_code"] = getattr(style, "code", "") or ""

            return attrs

  
