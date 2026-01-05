from django.db import models
from django.conf import settings
from django.utils import timezone
from catalog.models import Category


class Workflow(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=150)
    module = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class WorkflowStep(models.Model):
    workflow = models.ForeignKey(
        Workflow, on_delete=models.CASCADE, related_name="steps"
    )
    order = models.PositiveIntegerField()
    name = models.CharField(max_length=100)

    # must match AdminRole.role
    required_role = models.CharField(max_length=50)

    class Meta:
        ordering = ["order"]
        unique_together = ("workflow", "order")

    def __str__(self):
        return f"{self.workflow.code} → {self.name}"


class ApprovalInstance(models.Model):
    workflow = models.ForeignKey(Workflow, on_delete=models.PROTECT)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, null=True, blank=True
    )

    entity_type = models.CharField(max_length=50)   # style / product
    entity_id = models.UUIDField()   
    entity_ref = models.CharField(max_length=100)

    current_step = models.ForeignKey(
        WorkflowStep, on_delete=models.PROTECT
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ("IN_PROGRESS", "In Progress"),
            ("APPROVED", "Approved"),
            ("REJECTED", "Rejected"),
        ],
        default="IN_PROGRESS",
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="approval_created",
    )

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.entity_ref} [{self.status}]"


class ApprovalAction(models.Model):
    instance = models.ForeignKey(
        ApprovalInstance, on_delete=models.CASCADE, related_name="actions"
    )
    step = models.ForeignKey(WorkflowStep, on_delete=models.PROTECT)

    action = models.CharField(
        max_length=20,
        choices=[
            ("submit", "Submit"),
            ("approve", "Approve"),
            ("reject", "Reject"),
            ("comment", "Comment"), 
            ("resubmit", "Resubmit"),
        ],
    )

    comment = models.TextField(blank=True)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT
    )
    performed_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.instance.entity_ref} → {self.action}"
