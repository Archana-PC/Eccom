from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from approval_engine.models import ApprovalInstance, Workflow
from approval_engine.api.serializers import (
    ApprovalInstanceListSerializer,
    ApprovalInstanceDetailSerializer,
    ApprovalSubmitSerializer,
    ApprovalDecisionSerializer,
)
from approval_engine.api.permissions import CanActOnApproval
from approval_engine.services.services import (
    approve_instance,
    reject_instance,
    resubmit_instance,
)

class ApprovalViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ApprovalInstance.objects.select_related(
        "workflow", "current_step", "created_by"
    ).prefetch_related("actions")

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ApprovalInstanceDetailSerializer
        return ApprovalInstanceListSerializer

