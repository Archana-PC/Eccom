from django.core.exceptions import PermissionDenied, ValidationError
from ..models import ApprovalAction


# -------------------------
# Permission check
# -------------------------
def can_user_approve(user, approval):
    if user.is_superuser:
        return True

    if not user.role_group:
        return False

    # role check
    if user.role_group.role != approval.current_step.required_role:
        return False

    # category check
    if approval.category and user.role_group.category:
        if approval.category != user.role_group.category:
            return False

    return True


# -------------------------
# CORE STEP LOGIC (internal)
# -------------------------
def approve_step(approval, user, comment=""):
    if not can_user_approve(user, approval):
        raise PermissionDenied("You cannot approve this step")

    ApprovalAction.objects.create(
        instance=approval,
        step=approval.current_step,
        action="approve",
        comment=comment or f"Approved by {user.username}",
        performed_by=user,
    )

    next_step = (
        approval.workflow.steps
        .filter(order__gt=approval.current_step.order)
        .order_by("order")
        .first()
    )

    if next_step:
        approval.current_step = next_step
    else:
        approval.status = "APPROVED"

    # ✅ ALWAYS SAVE
    approval.save()
    return approval


# -------------------------
# PUBLIC API / ADMIN WRAPPERS
# -------------------------
def approve_instance(*, instance, user, comment=None):
    """
    Wrapper used by API and Admin
    """
    return approve_step(
        approval=instance,
        user=user,
        comment=comment,
    )


def reject_instance(*, instance, user, comment=None):
    """
    Reject the approval (comment required)
    """
    if not comment:
        raise ValidationError("Rejection comment is required.")

    if not can_user_approve(user, instance):
        raise PermissionDenied("You cannot reject this step")

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
    """
    Resubmit a rejected approval
    """
    if instance.status != "REJECTED":
        raise ValidationError("Only rejected approvals can be resubmitted.")

    first_step = instance.workflow.steps.order_by("order").first()

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
