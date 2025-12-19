from rest_framework.permissions import BasePermission


class CanActOnApproval(BasePermission):
    message = "You are not allowed to act on this approval."

    def has_object_permission(self, request, view, obj):
        if obj.status != "IN_PROGRESS":
            return False

        return getattr(request.user, "role", None) == obj.current_step.required_role
