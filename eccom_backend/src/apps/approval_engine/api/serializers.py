from rest_framework import serializers
from approval_engine.models import ApprovalInstance, ApprovalAction


class ApprovalActionSerializer(serializers.ModelSerializer):
    performed_by_name = serializers.CharField(source="performed_by.full_name", read_only=True)


    class Meta:
        model = ApprovalAction
        fields = [
            "id",
            "action",
            "comment",
            "performed_by_name",
            "performed_at",
        ]


class ApprovalInstanceListSerializer(serializers.ModelSerializer):
    workflow_name = serializers.CharField(source="workflow.name", read_only=True)
    step_name = serializers.CharField(source="current_step.name", read_only=True)
    required_role = serializers.CharField(
        source="current_step.required_role", read_only=True
    )

    class Meta:
        model = ApprovalInstance
        fields = [
            "id",
            "entity_type",
            "entity_id",
            "entity_ref",
            "workflow_name",
            "step_name",
            "required_role",
            "status",
            "created_at",
        ]


class ApprovalInstanceDetailSerializer(ApprovalInstanceListSerializer):
    actions = ApprovalActionSerializer(many=True, read_only=True)

    class Meta(ApprovalInstanceListSerializer.Meta):
        fields = ApprovalInstanceListSerializer.Meta.fields + ["actions"]


class ApprovalSubmitSerializer(serializers.Serializer):
    entity_type = serializers.CharField()
    entity_id = serializers.UUIDField()
    workflow_code = serializers.CharField()


class ApprovalDecisionSerializer(serializers.Serializer):
    comment = serializers.CharField(required=False, allow_blank=True)

from rest_framework import serializers

class ApprovalCommentSerializer(serializers.Serializer):
    comment = serializers.CharField(required=True, allow_blank=False)

