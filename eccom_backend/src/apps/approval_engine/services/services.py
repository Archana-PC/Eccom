from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.apps import apps

from approval_engine.models import ApprovalInstance, ApprovalAction, Workflow

APPROVER_ROLES = {"admin", "super_admin"}  # matches your user.role values


def can_user_decide(user):
    """Only Admin / Super Admin can approve/reject/resubmit."""
    if user.is_superuser:
        return True

    rg = getattr(user, "role_group", None)
    if not rg:
        return False

    return rg.role in APPROVER_ROLES


def can_user_comment(user, approval):
    """Tech/Concept can comment only if they match current step required_role (+ category)."""
    if user.is_superuser:
        return True

    rg = getattr(user, "role_group", None)
    if not rg:
        return False

    # allow admin roles to comment too (optional but usually helpful)
    if rg.role in APPROVER_ROLES:
        return True

    # must match step
    if rg.role != approval.current_step.required_role:
        return False

    # category match if role_group is category-specific
    if getattr(rg, "category_id", None):
        return approval.category_id == rg.category_id

    return True


@transaction.atomic
def submit_instance(*, user, entity_type, entity_id, workflow_code):
    """
    Create ApprovalInstance for product/style + create 'submit' action.
    Prevent duplicates for same entity while IN_PROGRESS.
    """

    existing = ApprovalInstance.objects.filter(
        entity_type=entity_type,
        entity_id=entity_id,
        status="IN_PROGRESS",
    ).order_by("-created_at").first()
    if existing:
        return existing

    workflow = get_object_or_404(Workflow, code=workflow_code)
    first_step = workflow.steps.order_by("order").first()
    if not first_step:
        raise ValidationError(f"No steps defined for workflow '{workflow_code}'")

    category = None
    entity_ref = str(entity_id)

    # your models are in catalog.models (Product, Style) :contentReference[oaicite:1]{index=1}
    if entity_type == "product":
        Product = apps.get_model("catalog", "Product")
        obj = get_object_or_404(Product, id=entity_id)
        category = obj.category
        entity_ref = (obj.style_code or obj.name or str(obj.id))  # uses your Product.style_code :contentReference[oaicite:2]{index=2}

    elif entity_type == "style":
        Style = apps.get_model("catalog", "Style")
        obj = get_object_or_404(Style, id=entity_id)
        # Style has "code" and "name" :contentReference[oaicite:3]{index=3}
        entity_ref = (obj.code or obj.name or str(obj.id))

    instance = ApprovalInstance.objects.create(
        workflow=workflow,
        category=category,
        entity_type=entity_type,
        entity_id=entity_id,
        entity_ref=entity_ref,
        current_step=first_step,
        status="IN_PROGRESS",
        created_by=user,
    )

    ApprovalAction.objects.create(
        instance=instance,
        step=first_step,
        action="submit",
        comment="",
        performed_by=user,
    )

    return instance


def approve_instance(*, instance, user, comment=None):
    if instance.status != "IN_PROGRESS":
        raise ValidationError("Only IN_PROGRESS approvals can be approved.")

    if not can_user_decide(user):
        raise PermissionDenied("Only Admin / Super Admin can approve.")

    ApprovalAction.objects.create(
        instance=instance,
        step=instance.current_step,
        action="approve",
        comment=comment or "",
        performed_by=user,
    )

    next_step = (
        instance.workflow.steps
        .filter(order__gt=instance.current_step.order)
        .order_by("order")
        .first()
    )

    if next_step:
        instance.current_step = next_step
    else:
        instance.status = "APPROVED"

    instance.save()
    return instance


def reject_instance(*, instance, user, comment=None):
    if instance.status != "IN_PROGRESS":
        raise ValidationError("Only IN_PROGRESS approvals can be rejected.")

    if not comment:
        raise ValidationError("Rejection comment is required.")

    if not can_user_decide(user):
        raise PermissionDenied("Only Admin / Super Admin can reject.")

    ApprovalAction.objects.create(
        instance=instance,
        step=instance.current_step,
        action="reject",
        comment=comment,
        performed_by=user,
    )

    instance.status = "REJECTED"
    instance.save()
    return instance


def resubmit_instance(*, instance, user, comment=""):
    if instance.status != "REJECTED":
        raise ValidationError("Only rejected approvals can be resubmitted.")

    if not can_user_decide(user):
        raise PermissionDenied("Only Admin / Super Admin can resubmit.")

    first_step = instance.workflow.steps.order_by("order").first()
    if not first_step:
        raise ValidationError("Workflow has no steps.")

    ApprovalAction.objects.create(
        instance=instance,
        step=first_step,
        action="resubmit",
        comment=comment or "Resubmitted",
        performed_by=user,
    )

    instance.current_step = first_step
    instance.status = "IN_PROGRESS"
    instance.save()
    return instance


def comment_instance(*, instance, user, comment):
    if instance.status != "IN_PROGRESS":
        raise ValidationError("Only IN_PROGRESS approvals can be commented.")

    if not comment:
        raise ValidationError("Comment is required.")

    if not can_user_comment(user, instance):
        raise PermissionDenied("You cannot comment on this approval.")

    ApprovalAction.objects.create(
        instance=instance,
        step=instance.current_step,
        action="comment",
        comment=comment,
        performed_by=user,
    )

    return instance
