from rest_framework.routers import DefaultRouter
from approval_engine.api.views import ApprovalViewSet

router = DefaultRouter()
router.register("approval_engine", ApprovalViewSet, basename="approvals")

urlpatterns = router.urls
