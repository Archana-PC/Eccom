from django.db import models
import uuid
from django.utils import timezone

class TimeStampedModel(models.Model):
    """Abstract base model with created and updated timestamps"""
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False )
    
    class Meta:
        abstract = True
        ordering = ['-created_at']

class UUIDModel(models.Model):
    """Abstract base model with UUID primary key"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    class Meta:
        abstract = True

class SoftDeleteModel(models.Model):
    """Abstract base model for soft deletion"""
    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        abstract = True
    
    def delete(self, soft_delete=True, *args, **kwargs):
        """Soft delete by default"""
        if soft_delete:
            self.is_active = False
            self.deleted_at = timezone.now()
            self.save()
        else:
            super().delete(*args, **kwargs)
    
    def restore(self):
        """Restore soft deleted object"""
        self.is_active = True
        self.deleted_at = None
        self.save()

class BaseModel(TimeStampedModel, UUIDModel, SoftDeleteModel):
    """Combined base model with all features"""
    
    class Meta:
        abstract = True