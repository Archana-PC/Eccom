from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    LoginSerializer,
    SignupSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)

User = get_user_model()


# Helper to decide cookie security
def _cookie_settings():
    """Use secure cookies in production, relax in DEBUG."""
    secure = not getattr(settings, "DEBUG", True)
    # for local dev on http: secure=False, samesite='Lax'
    if secure:
        return {"secure": True, "samesite": "None"}
    return {"secure": False, "samesite": "Lax"}


class LoginView(TokenObtainPairView):
    """
    POST: email, password -> set access & refresh cookies.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        access = response.data.get("access")
        refresh = response.data.get("refresh")
        user = response.data.get("user")

        if not access or not refresh:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        cookie_conf = _cookie_settings()

        # ACCESS cookie
        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            max_age=60 * 15,  # 15 minutes
            **cookie_conf,
        )

        # REFRESH cookie
        response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            max_age=60 * 60 * 24 * 7,  # 7 days
            **cookie_conf,
        )

        # Optionally blacklist old refresh if rotate is on handled by SimpleJWT
        
        # Do not return tokens in body for extra safety
        response.data = {
            "message": "Login successful",
             "user": user
        }

        return response


class RefreshView(TokenRefreshView):
    """
    POST: Uses refresh cookie to issue new access token cookie.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh")
        if refresh_token is None:
            return Response({"detail": "Refresh token missing"}, status=status.HTTP_400_BAD_REQUEST)

        request.data["refresh"] = refresh_token
        response = super().post(request, *args, **kwargs)

        access = response.data.get("access")
        if not access:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

        cookie_conf = _cookie_settings()

        response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            max_age=60 * 15,
            **cookie_conf,
        )

        response.data = {"message": "Token refreshed"}
        return response


class LogoutView(APIView):
    """
    POST: Deletes cookies and blacklists refresh token if possible.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")

        # Try blacklisting refresh token
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass  # don't crash logout if something goes wrong

        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie("access")
        response.delete_cookie("refresh")

        return response


class SignupView(APIView):
    """
    POST: Create new user.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # For production, send verification email here, or auto-activate as needed
            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """
    GET: Return current logged-in user details.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "employee_id": user.employee_id,
               
            }
        )


class PasswordResetRequestView(APIView):
    """
    POST: email -> send reset link to email (if exists).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Do not reveal that the email doesn't exist
            return Response({"message": "If this email exists, a reset link was sent."})

        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        reset_url = f"{getattr(settings, 'FRONTEND_RESET_URL', 'http://localhost:3000/reset-password')}?uid={uid}&token={token}"

        send_mail(
            subject="Password Reset",
            message=f"Use this link to reset your password: {reset_url}",
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
            recipient_list=[email],
            fail_silently=True,
        )

        return Response({"message": "If this email exists, a reset link was sent."})


class PasswordResetConfirmView(APIView):
    """
    POST: uid, token, new_password, new_password2 -> reset password.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password has been reset."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from ..models import AdminRole
from .serializers import (
    AdminRoleSerializer,
    UserSerializer,
    UserCreateUpdateSerializer,
)
from .permissions import IsAdminOrSuperAdmin

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-created_at")
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        """
        Admin/SuperAdmin → full create/update serializer
        Normal users      → read-only serializer
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return UserCreateUpdateSerializer

        return UserSerializer

    def get_permissions(self):
        """
        Restrict user creation/deletion:
        Only Admin & SuperAdmin can manage users.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsAdminOrSuperAdmin()]
        return [IsAuthenticated()]


class AdminRoleViewSet(viewsets.ModelViewSet):
    queryset = AdminRole.objects.filter(is_active=True)
    serializer_class = AdminRoleSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdminOrSuperAdmin()]
