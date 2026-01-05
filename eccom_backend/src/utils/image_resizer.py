from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

IMAGE_SIZES = {
    "thumb": (300, 65),
    "card": (600, 70),
    "zoom": (1200, 75),
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
