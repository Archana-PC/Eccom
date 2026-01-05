from rest_framework.permissions import BasePermission

class IsAdminOrSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        # ✅ Django superuser
        if user.is_superuser:
            return True

        # ✅ permission-based access
        return user.has_perm("accounts.add_adminrole")
