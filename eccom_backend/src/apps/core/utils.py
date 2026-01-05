from django.utils.text import slugify
import random
import string

from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

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


# for imaze resizer
IMAGE_SIZES = {
    "thumb": (300, 65),
    "card": (600, 70),
    "zoom": (1200, 75),
}

CATEGORY_IMAGE_SIZES = {
    "thumb": (120, 85),   # mobile circle
    "card": (240, 85),    # grid / home
    "banner": (600, 85),  # future banner
}

def resize_image(image, max_width, quality):
    img = Image.open(image)
    img = img.convert("RGB")

    if img.width > max_width:
        ratio = max_width / img.width
        height = int(img.height * ratio)
        img = img.resize((max_width, height), Image.LANCZOS)

    buffer = BytesIO()
    img.save(
        buffer,
        format="WEBP",
        quality=quality,
        optimize=True
    )

    return ContentFile(buffer.getvalue())
