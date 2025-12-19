from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LoginView, LogoutView, RefreshView, UserProfileView, SignupView,
    UserViewSet, AdminRoleViewSet
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("roles", AdminRoleViewSet, basename="roles")

urlpatterns = [
    # Normal API endpoints
    path("auth/signup/", SignupView.as_view(), name="signup"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/refresh/", RefreshView.as_view(), name="refresh"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/profile/", UserProfileView.as_view(), name="profile"),

    # Router URLs
    path("", include(router.urls)),
]
