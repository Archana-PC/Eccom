# catalog/views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Category, Brand, Product, ProductVariant, ProductImage,Collection
from .serializers import (
    CategorySerializer,
    CategoryTreeSerializer,
    BrandSerializer,
    ProductSerializer,
    ProductVariantSerializer,
    ProductImageSerializer,
    CollectionSerializer
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Read for everyone, write only for staff/admin.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    # --------------------------
    # MAIN QUERYSET HANDLING
    # --------------------------
    def get_queryset(self):
        parent = self.request.query_params.get("parent", None)

        # 1) If ?parent= is NOT passed → return ROOT categories
        if parent is None:
            return Category.objects.filter(parent__isnull=True, is_active=True)

        # 2) If ?parent=ID → return subcategories of that parent
        return Category.objects.filter(parent_id=parent, is_active=True)

    # --------------------------
    # SERIALIZER SELECTION
    # --------------------------
    def get_serializer_class(self):
        """
        We do NOT return tree in the default list response.
        /categories/ → should return only root categories
        /categories/?parent=ID → should return only subcategories
        /categories/tree/ → will return the full tree
        """
        return CategorySerializer

    # --------------------------
    # CATEGORY TREE (FULL)
    # --------------------------
    @action(detail=False, methods=["get"])
    def tree(self, request):
        """
        Get ALL categories nested recursively.
        """
        roots = Category.objects.filter(parent__isnull=True, is_active=True)
        serializer = CategoryTreeSerializer(roots, many=True)
        return Response(serializer.data)

    # --------------------------
    # PRODUCTS UNDER CATEGORY + SUBCATEGORIES
    # --------------------------
    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        """
        /categories/<id>/products/
        Returns all products for:
        - This category
        - Its children
        - Grandchildren
        - Infinite nested levels
        """
        category = self.get_object()

        # Recursive function to collect all descendant IDs
        def collect(cat):
            ids = [cat.id]
            for child in cat.children.filter(is_active=True):
                ids.extend(collect(child))
            return ids

        category_ids = collect(category)

        # Fetch products under ALL collected categories
        products = Product.objects.filter(
            category_id__in=category_ids,
            is_active=True
        )

        # Pagination support
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # No pagination
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.filter(is_active=True)
    serializer_class = CollectionSerializer
    lookup_field = "slug"   # <— IMPORTANT

    @action(detail=True, methods=["get"])
    def products(self, request, slug=None):
        collection = self.get_object()
        products = collection.products.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)



class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by("name")
    serializer_class = BrandSerializer
    permission_classes = [IsAdminOrReadOnly]



class ProductViewSet(viewsets.ModelViewSet):
    queryset = (
        Product.objects.filter(is_active=True)
        .select_related("category", "brand")
        .prefetch_related("variants", "images")
    )
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()

        # Filter by category slug
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        # Filter by category (ID) including subcategories
        category_id = self.request.query_params.get('category_id')
        if category_id:
            try:
                category = Category.objects.get(id=category_id, is_active=True)
            except Category.DoesNotExist:
                return qs.none()

            # Recursively find children
            def collect_ids(cat):
                ids = [cat.id]
                for child in cat.children.filter(is_active=True):
                    ids.extend(collect_ids(child))
                return ids

            category_ids = collect_ids(category)
            qs = qs.filter(category_id__in=category_ids)

        return qs


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related("product").all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.select_related("product").all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]
