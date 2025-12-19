from approval_engine.models import Workflow, WorkflowStep, ApprovalInstance


def start_inventory_approval(style, user):

    # 1️⃣ Create or fetch workflow
    workflow, _ = Workflow.objects.get_or_create(
        code="INV_NEW_STYLE",
        defaults={
            "name": "Inventory New Style Approval",
            "module": "inventory",
        },
    )

    # 2️⃣ Create steps safely (runs only once)
    steps = [
        (1, "Design Submit", "tech_designer"),
        (2, "Design Review", "concept_design_manager"),
        (3, "Procurement", "procurement_merchant"),
        (4, "Admin Approval", "admin"),
    ]

    for order, name, role in steps:
        WorkflowStep.objects.get_or_create(
            workflow=workflow,
            order=order,
            defaults={
                "name": name,
                "required_role": role,
            },
        )

    # 3️⃣ First step
    first_step = workflow.steps.order_by("order").first()

    # 4️⃣ Create approval instance
    ApprovalInstance.objects.get_or_create(
        workflow=workflow,
        entity_type="style",
        entity_id=style.id,
        defaults={
            "entity_ref": style.style_code,
            "category": style.category,
            "current_step": first_step,
            "created_by": user,
        },
    )
