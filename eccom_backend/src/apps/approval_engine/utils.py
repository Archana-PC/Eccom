# approvals/utils.py
from approval_engine.models import ApprovalInstance

def has_pending_approval(product):
    return ApprovalInstance.objects.filter(
        entity_type="product",
        entity_id=product.id,
        status="IN_PROGRESS"
    ).exists()
