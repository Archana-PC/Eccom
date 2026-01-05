from rest_framework.permissions import BasePermission

APPROVER_ROLES = {"admin", "super_admin"}

class CanActOnApproval(BasePermission):
    message = "Only Admin / Super Admin can approve or reject."

    def has_object_permission(self, request, view, obj):
        if obj.status != "IN_PROGRESS":
            return False

        user = request.user
        if user.is_superuser:
            return True

        role_group = getattr(user, "role_group", None)
        if not role_group:
            return False

        return role_group.role in APPROVER_ROLES


class CanCommentOnApproval(BasePermission):
    message = "You are not allowed to comment on this approval."

    def has_object_permission(self, request, view, obj):
        if obj.status != "IN_PROGRESS":
            return False

        user = request.user
        if user.is_superuser:
            return True

        role_group = getattr(user, "role_group", None)
        if not role_group:
            return False

        # ✅ only the current step reviewer can comment
        if role_group.role != obj.current_step.required_role:
            return False

        # ✅ if reviewer is category-specific → must match instance.category
        if getattr(role_group, "category_id", None):
            return obj.category_id == role_group.category_id

        return True
