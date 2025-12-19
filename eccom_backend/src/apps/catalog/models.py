# catalog/models.py
from django.db import models
from django.utils.text import slugify
from core.utils import generate_unique_slug
from core.models import BaseModel
from catalog.constants import FIT_CHOICES,PATTERN_CHOICES,SLEEVE_CHOICES,COLLAR_CHOICES

class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.SET_NULL,  # safer than CASCADE
    )

    # NOTE: is_active inherited from BaseModel (soft delete flag)

     # Category classification for future expansion
    CATEGORY_TYPE_CHOICES = [
        ('CLOTHING', 'Clothing'),
        ('ACCESSORIES', 'Accessories'),
        ('FOOTWEAR', 'Footwear'),
        ('OTHER', 'Other'),
    ]
    
    category_type = models.CharField(
        max_length=20,
        choices=CATEGORY_TYPE_CHOICES,
        default='CLOTHING',
        help_text="Determines which product attributes are relevant"
    )

      # Category-specific settings
    requires_fabric = models.BooleanField(default=True, help_text="Does this category require fabric info?")
    requires_fit = models.BooleanField(default=True, help_text="Does this category require fit info?")
    requires_size_chart = models.BooleanField(default=True, help_text="Does this category require size chart?")
    
    display_order = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name

    @property
    def is_root(self):
        return self.parent is None

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.name, "slug")

        if self.category_type == 'ACCESSORIES':
            self.requires_fabric = False
            self.requires_fit = False
            self.requires_size_chart = False
        elif self.category_type == 'CLOTHING':
            self.requires_fabric = True
            self.requires_fit = True
            self.requires_size_chart = True

        super().save(*args, **kwargs)


class Collection(BaseModel):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    description = models.TextField(blank=True)
    featured_image = models.ImageField(upload_to="collections/", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Brand(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    # is_active comes from BaseModel

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.name, "slug")
        super().save(*args, **kwargs)


class Fabric(BaseModel):
    """Fabric types for clothing"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)
    composition = models.CharField(max_length=200, blank=True, help_text="e.g., 100% Cotton, 60% Cotton 40% Polyester")
    care_instructions = models.TextField(blank=True)
    
    # For filtering
    is_natural = models.BooleanField(default=True)
    is_stretch = models.BooleanField(default=False)
    weight = models.CharField(max_length=50, blank=True, help_text="e.g., Lightweight, Medium, Heavy")

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Material(BaseModel):
    """Materials for accessories (future expansion)"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)
    
    MATERIAL_TYPE_CHOICES = [
        ('LEATHER', 'Leather'),
        ('METAL', 'Metal'),
        ('WOOD', 'Wood'),
        ('PLASTIC', 'Plastic'),
        ('FABRIC', 'Fabric'),
        ('OTHER', 'Other'),
    ]
    
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPE_CHOICES, default='OTHER')

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(BaseModel):
    """
    A base product: e.g., 'Oversized Cotton T-Shirt'.
    Variants handle size & color.
    """
    is_active = models.BooleanField(default=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    collections = models.ManyToManyField(
    Collection,
    related_name="products",
    blank=True
)

    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name="products",
        null=True,
        blank=True,
    )


     # 1. FABRIC (for clothing)
    fabric = models.ForeignKey(
        Fabric,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
        help_text="Primary fabric/material of the product"
    )
    
    fabric_composition = models.CharField(
        max_length=200,
        blank=True,
        help_text="Detailed fabric composition (overrides fabric.composition if needed)"
    )

    # 2. FIT (for clothing)
    fit = models.CharField(
        max_length=20,
        choices=FIT_CHOICES,
        null=True,
        blank=True,
        default="REGULAR",
        help_text="How the garment fits"
    )

     # 3. SIZE CHART (can be image or text description)
    size_chart_image = models.ImageField(
        upload_to="size_charts/",
        blank=True,
        null=True,
        help_text="Upload size chart as image"
    )
    
    size_chart_description = models.TextField(
        blank=True,
        help_text="Or describe size chart details as text"
    )

     # 4. MEASUREMENTS (structured JSON data)
    measurements = models.JSONField(
        default=dict,
        blank=True,
        help_text="""Product measurements in JSON format. Example:
        {
            "guide": "Body measurements in inches",
            "size_m": {"chest": "40", "waist": "34", "length": "28"},
            "size_l": {"chest": "42", "waist": "36", "length": "29"},
            "model_info": "Model is 6'0\" wearing size L"
        }"""
    )

     # 5. SKU/STYLE CODE (at product level)
    style_code = models.CharField(
        max_length=50,
        blank=True,
        db_index=True,
        help_text="Manufacturer/style code (e.g., MCT001-BLK)"
    )

    # === Additional Clothing Attributes ===
    collar_type = models.CharField(
        max_length=50, 
        blank=True, 
        choices=COLLAR_CHOICES,
        help_text="e.g., Crew Neck, V-Neck, Polo"
    )
    
    
    sleeve_type = models.CharField(
        max_length=50, 
        blank=True, 
        choices=SLEEVE_CHOICES,
        help_text="e.g., Short Sleeve, Long Sleeve")
    pattern = models.CharField(
        max_length=100, 
        blank=True, 
        choices=PATTERN_CHOICES,
        help_text="e.g., Solid, Striped, Checkered")
    
    # === For Future Accessories Expansion ===
    material = models.ForeignKey(
        Material,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accessory_products",
        help_text="Material for accessories (leather, metal, etc.)"
    )
    
    dimensions = models.JSONField(
        default=dict,
        blank=True,
        help_text="For accessories: dimensions in JSON format"
    )

    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

    # is_active from BaseModel

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.name, "slug")
        super().save(*args, **kwargs)

    @property
    def default_variant(self):
        # first active variant (you can customize ordering)
        return self.variants.filter(is_active=True).first()



class Color(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    hex_code = models.CharField(max_length=7, blank=True)  # Optional "#000000"

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Normalize name (Black, Red, Navy Blue...)
        self.name = self.name.strip().title()

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

class ProductVariant(BaseModel):
    """
    Single SKU: e.g. 'Black / M' of a Product.
    """
    SIZE_CHOICES = [
        ("XS", "XS"),
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
        ("XL", "XL"),
        ("XXL", "XXL"),
    ]

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
    )

    # variant sku
    sku = models.CharField(max_length=50, unique=True, blank=True)

    color = models.ForeignKey(Color, on_delete=models.PROTECT, related_name="variants")
    size = models.CharField(max_length=4, choices=SIZE_CHOICES)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_at_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    stock_qty = models.PositiveIntegerField(default=0)
    # is_active from BaseModel

    class Meta:
        unique_together = ("product", "color", "size")
        indexes = [
            models.Index(fields=["product", "is_active"]),
            models.Index(fields=["sku"]),
        ]

    def __str__(self):
        return f"{self.product.name} - {self.color} / {self.size}"

    def _generate_sku(self):
        """
        Simple SKU generator.
        Example: TSHIRT-BLACK-M, TSHIRT-BLACK-M-1 ...
        """
        base_part = slugify(self.product.name)[:12].replace("-", "").upper()
        color_part = slugify(self.color)[:6].replace("-", "").upper()
        size_part = self.size.upper()

        base_sku = f"{base_part}-{color_part}-{size_part}".strip("-")

        sku = base_sku
        counter = 1
        ModelClass = self.__class__
        qs = ModelClass.objects.all()
        if self.pk:
            qs = qs.exclude(pk=self.pk)

        while qs.filter(sku=sku).exists():
            sku = f"{base_sku}-{counter}"
            counter += 1

        return sku

    def save(self, *args, **kwargs):
    # Auto-generate SKU if not provided
      if not self.sku:
        self.sku = self._generate_sku()

      super().save(*args, **kwargs)



class ProductImage(BaseModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=255, blank=True)
    is_main = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return f"Image for {self.product.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Ensure only one main image per product
        if self.is_main:
            self.product.images.exclude(pk=self.pk).filter(is_main=True).update(is_main=False)
