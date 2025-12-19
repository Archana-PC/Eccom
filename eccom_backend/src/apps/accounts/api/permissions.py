from rest_framework.permissions import BasePermission


class IsAdminOrSuperAdmin(BasePermission):
    """
    Only Admin and SuperAdmin can create/update/delete users.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        return user.role in ["admin", "super_admin"]
