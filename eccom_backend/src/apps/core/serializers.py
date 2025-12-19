from rest_framework import serializers

class TimeStampedSerializer(serializers.ModelSerializer):
    """Base serializer for TimeStampedModel"""
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    
    class Meta:
        fields = ['created_at', 'updated_at']

class BaseModelSerializer(TimeStampedSerializer):
    """Combined base serializer"""
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        fields = TimeStampedSerializer.Meta.fields + ['is_active']