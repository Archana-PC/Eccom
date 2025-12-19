
from django.contrib import admin
from .models import Workflow, WorkflowStep, ApprovalInstance, ApprovalAction


@admin.register(Workflow)
class WorkflowAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'module']
    search_fields = ['code', 'name']
    ordering = ['name']


@admin.register(WorkflowStep)
class WorkflowStepAdmin(admin.ModelAdmin):
    list_display = ['workflow', 'order', 'name', 'required_role']
    list_filter = ['workflow', 'required_role']
    ordering = ['workflow', 'order']


class ApprovalActionInline(admin.TabularInline):
    model = ApprovalAction
    extra = 0
    readonly_fields = ['step', 'action', 'performed_by', 'performed_at', 'comment']
    can_delete = False


@admin.register(ApprovalInstance)
class ApprovalInstanceAdmin(admin.ModelAdmin):
    list_display = ['entity_ref', 'workflow', 'current_step', 'status', 'created_by', 'created_at']
    list_filter = ['status', 'workflow', 'entity_type']
    search_fields = ['entity_ref', 'entity_id']
    readonly_fields = ['created_at', 'current_step', 'status']
    inlines = [ApprovalActionInline]
    
    fieldsets = (
        ('Basic Info', {
            'fields': ('workflow', 'status', 'created_by', 'created_at')
        }),
        ('Entity Info', {
            'fields': ('entity_type', 'entity_id', 'entity_ref', 'category')
        }),
        ('Current State', {
            'fields': ('current_step',)
        }),
    )


@admin.register(ApprovalAction)
class ApprovalActionAdmin(admin.ModelAdmin):
    list_display = ['instance', 'step', 'action', 'performed_by', 'performed_at']
    list_filter = ['action', 'step__workflow']
    search_fields = ['instance__entity_ref', 'comment']
    readonly_fields = ['performed_at']