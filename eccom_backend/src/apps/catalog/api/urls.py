# catalog/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    BrandViewSet,
    ProductViewSet,
    ProductVariantViewSet,
    ProductImageViewSet,
    CollectionViewSet
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("collections", CollectionViewSet)
router.register("brands", BrandViewSet, basename="brand")
router.register("products", ProductViewSet, basename="product")
router.register("variants", ProductVariantViewSet, basename="variant")
router.register("images", ProductImageViewSet, basename="productimage")


urlpatterns = [
    path("api/", include(router.urls)),
]
