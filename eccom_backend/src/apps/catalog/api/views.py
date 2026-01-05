# catalog/views.py
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from ..models import Category, Brand, Product, ProductVariant, ProductImage,Collection,Style,Color,Fabric,Material
from .serializers import (
    CategorySerializer,
    CategoryTreeSerializer,
    BrandSerializer,
    ProductSerializer,
    ProductVariantSerializer,
    ProductImageSerializer,
    CollectionSerializer,
    ProductCardSerializer,
    StyleSerializer,
    ColorSerializer,
    FabricSerializer,
    MaterialSerializer,
    
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Read for everyone, write only for staff/admin.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class PublicCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        # ✅ Default categories endpoint: ONLY ROOT
        if self.action == "list":
            return Category.objects.filter(is_active=True, parent__isnull=True)

        # ✅ Tree action will handle its own queryset
        if self.action == "tree":
            return Category.objects.none()

        # ✅ Optional: for retrieve, allow fetching any active category by id
        return Category.objects.filter(is_active=True)

    def get_serializer_class(self):
        # ✅ Use tree serializer only for /categories/tree/
        if self.action == "tree":
            return CategoryTreeSerializer
        return CategorySerializer

    @action(detail=False, methods=["get"])
    def tree(self, request):
        # ✅ FULL tree: roots + nested children
        roots = Category.objects.filter(is_active=True, parent__isnull=True)
        serializer = CategoryTreeSerializer(roots, many=True)
        return Response(serializer.data)

class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("display_order", "name")
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"

    @action(detail=False, methods=["get"], url_path="roots")
    def roots(self, request):
        """
        /api/admin/categories/roots/
        Returns ALL ROOT categories (no pagination) - for dropdown.
        """
        qs = self.get_queryset().filter(parent__isnull=True)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

# PUBLIC (store / website): slug + only active + read-only
class PublicColorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Color.objects.filter(is_active=True).order_by("name")
    serializer_class = ColorSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


# ADMIN (dashboard): pk + all records + full CRUD
class AdminColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all().order_by("name")     # ✅ admin sees active+inactive
    serializer_class = ColorSerializer
    permission_classes = [IsAdminUser]                 # or your IsAdminOrSuperAdmin, etc.
    lookup_field = "pk"  

# ---------- FABRIC ----------
class PublicFabricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Fabric.objects.filter(is_active=True).order_by("name")
    serializer_class = FabricSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

class AdminFabricViewSet(viewsets.ModelViewSet):
    queryset = Fabric.objects.all().order_by("name")
    serializer_class = FabricSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"

# ---------- MATERIAL ----------
class PublicMaterialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Material.objects.filter(is_active=True).order_by("name")
    serializer_class = MaterialSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

class AdminMaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all().order_by("name")
    serializer_class = MaterialSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"

# ---------- STYLE ----------
class PublicStyleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Style.objects.filter(is_active=True).order_by("name")
    serializer_class = StyleSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    @action(detail=True, methods=["get"])
    def products(self, request, slug=None):
        style = self.get_object()

        # safest (works even if related_name is not set)
        qs = (
            Product.objects.filter(is_active=True, style=style)
            .select_related("category", "brand", "style")
            .prefetch_related("variants", "images")
        )

        # return light card serializer (better for listing)
        page = self.paginate_queryset(qs)
        if page is not None:
            ser = ProductCardSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(ser.data)

        ser = ProductCardSerializer(qs, many=True, context={"request": request})
        return Response(ser.data)
class AdminStyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all().order_by("name")
    serializer_class = StyleSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"
# ---------- COLLECTION ----------
class PublicCollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.filter(is_active=True)
    serializer_class = CollectionSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    @action(detail=True, methods=["get"])
    def products(self, request, slug=None):
        collection = self.get_object()
        products = collection.products.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class AdminCollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"



class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by("name")
    serializer_class = BrandSerializer
    permission_classes = [IsAdminOrReadOnly]



class PublicProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        qs = (
            Product.objects.filter(is_active=True)
            .select_related("category", "brand")
            .prefetch_related("variants", "images")
        )

        # same category filter logic you already wrote
        category_slug = self.request.query_params.get("category")
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug, is_active=True)
            except Category.DoesNotExist:
                return qs.none()

            def collect_ids(cat):
                ids = [cat.id]
                for child in cat.children.filter(is_active=True):
                    ids.extend(collect_ids(child))
                return ids

            qs = qs.filter(category_id__in=collect_ids(category))

        return qs
    
class AdminProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"  # ✅ UUID primary key
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # ✅ for size_chart_image

    def get_queryset(self):
        return (
            Product.objects.all()  # ✅ admin sees active + inactive
            .select_related("category", "brand")
            .prefetch_related("variants", "images")
            .order_by("-created_at")
        )

class CategoryProductsView(APIView):
    """
    GET /api/categories/<slug>/products/?page=1&page_size=20
    Returns products from category + all subcategories (paginated)
    """

    def get(self, request, slug):
        # 1) Get category by slug
        category = get_object_or_404(Category, slug=slug, is_active=True)

        # 2) Collect category + subcategory ids (same as yours)
        def collect_ids(cat):
            ids = [cat.id]
            for child in cat.children.filter(is_active=True):
                ids.extend(collect_ids(child))
            return ids

        category_ids = collect_ids(category)

        # 3) Product queryset (same, but add ordering for stable paging)
        qs = (
            Product.objects.filter(is_active=True, category_id__in=category_ids)
            .select_related("category", "brand")
            .prefetch_related("variants", "images")
            .order_by("-created_at")  # ✅ important for consistent pages
        )

        # 4) ✅ Pagination (this is the new part)
        paginator = PageNumberPagination()
        paginator.page_size_query_param = "page_size"  # allow ?page_size=20

        page = paginator.paginate_queryset(qs, request, view=self)

        serializer = ProductCardSerializer(
            page,
            many=True,
            context={"request": request}
        )

        return paginator.get_paginated_response(serializer.data)
    
class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related("product").all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = (
        ProductImage.objects
        .select_related("product")
        .order_by("sort_order")
    )
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

class HomeProductsAPIView(APIView):
    def get(self, request):
        qs = Product.objects.filter(
            is_active=True,
            show_on_home=True
        ).select_related(
            "brand", "category"
        ).prefetch_related(
            "variants", "images"
        )

        serializer_context = {"request": request}

        return Response({
            "sections": [
                {
                    "key": "new_arrivals",
                    "title": "New Arrivals",
                    "products": ProductCardSerializer(
                        qs.filter(is_new_arrival=True)[:6],
                        many=True,
                        context=serializer_context
                    ).data,
                },
                {
                    "key": "featured",
                    "title": "Featured Products",
                    "products": ProductCardSerializer(
                        qs.filter(is_featured=True)[:6],
                        many=True,
                        context=serializer_context
                    ).data,
                },
                {
                    "key": "trending",
                    "title": "Trending Now",
                    "products": ProductCardSerializer(
                        qs.filter(is_best_seller=True)[:6],
                        many=True,
                        context=serializer_context
                    ).data,
                },
            ]
        })


