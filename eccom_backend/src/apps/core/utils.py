from django.utils.text import slugify
import random
import string

def generate_unique_slug(instance, value, slug_field_name="slug"):
    """
    Generate a unique slug for any model instance.
    If 'shirts' exists, next will be 'shirts-1', 'shirts-2', ...
    """
    slug_field = instance._meta.get_field(slug_field_name)
    max_length = slug_field.max_length

    base_slug = slugify(value)[:max_length]
    slug = base_slug
    ModelClass = instance.__class__
    counter = 1

    # Exclude current instance when updating
    qs = ModelClass.objects.all()
    if instance.pk:
        qs = qs.exclude(pk=instance.pk)

    while qs.filter(**{slug_field_name: slug}).exists():
        suffix = f"-{counter}"
        # trim base if needed to fit max_length with suffix
        allowed_length = max_length - len(suffix)
        slug = f"{base_slug[:allowed_length]}{suffix}"
        counter += 1

    return slug

def generate_random_code(length=8, prefix=''):
    """Generate random alphanumeric code"""
    chars = string.ascii_uppercase + string.digits
    random_part = ''.join(random.choice(chars) for _ in range(length))
    return f"{prefix}{random_part}"