from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..models import AdminRole

User = get_user_model()


# ===========================================================
# AUTH
# ===========================================================

class LoginSerializer(TokenObtainPairSerializer):
     username_field = "email"

     def validate(self, attrs):
        data = super().validate(attrs)

        # 🔑 attach authenticated user info
        data["user"] = {
            "id": self.user.id,
            "email": self.user.email,
        }

        return data


# ===========================================================
# SIGNUP (PUBLIC USERS ONLY → CUSTOMER)
# ===========================================================

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "full_name", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        validate_password(attrs["password"])
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password2", None)

        # Assign CUSTOMER role_group
        role_group = AdminRole.objects.filter(
            role="customer", category__isnull=True
        ).first()

        user = User.objects.create_user(
            email=validated_data["email"],
            password=password,
            full_name=validated_data.get("full_name", ""),
            role_group=role_group,
        )

        return user


# ===========================================================
# PASSWORD RESET
# ===========================================================

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        validate_password(attrs["new_password"])
        return attrs

    def save(self, **kwargs):
        uid = force_str(urlsafe_base64_decode(self.validated_data["uid"]))
        user = User.objects.get(pk=uid)

        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, self.validated_data["token"]):
            raise serializers.ValidationError({"token": "Invalid or expired token"})

        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


# ===========================================================
# ADMIN ROLE
# ===========================================================

class AdminRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminRole
        fields = [
            "id",
            "name",
            "role",
            "category",
            "permissions",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


# ===========================================================
# USER READ
# ===========================================================

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    role_group = AdminRoleSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "employee_id",
            "role",
            "category",
            "role_group",
            "is_active",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
        ]

    def get_role(self, obj):
        return obj.role_group.role if obj.role_group else None

    def get_category(self, obj):
        if obj.role_group and obj.role_group.category:
            return obj.role_group.category.name
        return None


# ===========================================================
# USER CREATE / UPDATE (ADMIN ONLY)
# ===========================================================

class UserCreateUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "full_name",
            "role_group",
            "is_active",
            "is_staff",
        ]
        read_only_fields = ["employee_id"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
