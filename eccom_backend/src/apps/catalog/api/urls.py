# catalog/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BrandViewSet,
    ProductVariantViewSet,
    ProductImageViewSet,
    CategoryProductsView,
    HomeProductsAPIView,
    PublicColorViewSet,
    AdminColorViewSet,
    AdminCategoryViewSet,
    AdminCollectionViewSet,
    AdminStyleViewSet,
    AdminFabricViewSet,
    AdminMaterialViewSet,
    PublicCategoryViewSet,
    PublicCollectionViewSet,
    PublicProductViewSet,
    PublicStyleViewSet,
    PublicFabricViewSet,
    PublicMaterialViewSet,
    AdminProductViewSet,

)


router = DefaultRouter()
router.register("categories", PublicCategoryViewSet, basename="category")
router.register("collections", PublicCollectionViewSet, basename="collection")
router.register("brands", BrandViewSet, basename="brand")
router.register("products", PublicProductViewSet, basename="product")
router.register("variants", ProductVariantViewSet, basename="variant")
router.register("images", ProductImageViewSet, basename="productimage")
router.register("styles", PublicStyleViewSet, basename="style")
router.register("fabrics", PublicFabricViewSet, basename="fabric")
router.register("materials", PublicMaterialViewSet, basename="material")
router.register("colors", PublicColorViewSet, basename="colors")


# ADMIN
router.register("admin/categories", AdminCategoryViewSet, basename="admin-categories")
router.register("admin/collections", AdminCollectionViewSet, basename="admin-collections")
router.register("admin/styles", AdminStyleViewSet, basename="admin-styles")
router.register("admin/fabrics", AdminFabricViewSet, basename="admin-fabrics")
router.register("admin/materials", AdminMaterialViewSet, basename="admin-materials")
router.register("admin/colors", AdminColorViewSet, basename="admin-colors")
router.register("admin/products", AdminProductViewSet, basename="admin-products")




urlpatterns = [
    path("", include(router.urls)),
    path(
        "categories/<slug:slug>/products/",
        CategoryProductsView.as_view(),
        name="category-products"
    ),
     path(
        "home/products/",
        HomeProductsAPIView.as_view(),
        name="home-products",
    ),
]

