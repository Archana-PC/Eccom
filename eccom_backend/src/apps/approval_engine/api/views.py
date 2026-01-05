from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from approval_engine.models import ApprovalInstance, ApprovalAction
from approval_engine.api.serializers import (
    ApprovalInstanceListSerializer,
    ApprovalInstanceDetailSerializer,
    ApprovalDecisionSerializer,
    ApprovalCommentSerializer,
    ApprovalSubmitSerializer,
)
from approval_engine.api.permissions import CanActOnApproval, CanCommentOnApproval
from approval_engine.services.services import (
    submit_instance,
    approve_instance,
    reject_instance,
    resubmit_instance,
)


class ApprovalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        ApprovalInstance.objects
        .select_related("workflow", "current_step", "created_by", "category")
        .prefetch_related("actions", "actions__performed_by", "actions__step")
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve", "by_entity"):
            return [IsAuthenticated()]

        if self.action == "submit":
            return [IsAuthenticated()]

        if self.action in ("approve", "reject", "resubmit"):
            return [IsAuthenticated(), CanActOnApproval()]

        if self.action == "comment":
            return [IsAuthenticated(), CanCommentOnApproval()]

        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ApprovalInstanceDetailSerializer
        return ApprovalInstanceListSerializer

    @action(detail=False, methods=["post"])
    def submit(self, request):
        s = ApprovalSubmitSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        instance = submit_instance(
            user=request.user,
            entity_type=s.validated_data["entity_type"],
            entity_id=s.validated_data["entity_id"],
            workflow_code=s.validated_data["workflow_code"],
        )
        return Response(ApprovalInstanceDetailSerializer(instance).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"], url_path="by-entity")
    def by_entity(self, request):
        entity_type = request.query_params.get("entity_type")
        entity_id = request.query_params.get("entity_id")
        if not entity_type or not entity_id:
            return Response({"detail": "entity_type and entity_id required"}, status=400)

        inst = (
            self.get_queryset()
            .filter(entity_type=entity_type, entity_id=entity_id)
            .order_by("-created_at")
            .first()
        )
        if not inst:
            return Response(None, status=status.HTTP_200_OK)

        return Response(ApprovalInstanceDetailSerializer(inst).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def comment(self, request, pk=None):
        instance = self.get_object()
        s = ApprovalCommentSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        ApprovalAction.objects.create(
            instance=instance,
            step=instance.current_step,
            action="comment",
            comment=s.validated_data["comment"],
            performed_by=request.user,
        )
        instance.refresh_from_db()
        return Response(ApprovalInstanceDetailSerializer(instance).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        instance = self.get_object()
        s = ApprovalDecisionSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        updated = approve_instance(instance=instance, user=request.user, comment=s.validated_data.get("comment", ""))
        return Response(ApprovalInstanceDetailSerializer(updated).data)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        instance = self.get_object()
        s = ApprovalDecisionSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        updated = reject_instance(instance=instance, user=request.user, comment=s.validated_data.get("comment", ""))
        return Response(ApprovalInstanceDetailSerializer(updated).data)

    @action(detail=True, methods=["post"])
    def resubmit(self, request, pk=None):
        instance = self.get_object()
        s = ApprovalDecisionSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        updated = resubmit_instance(instance=instance, user=request.user, comment=s.validated_data.get("comment", ""))
        return Response(ApprovalInstanceDetailSerializer(updated).data)
