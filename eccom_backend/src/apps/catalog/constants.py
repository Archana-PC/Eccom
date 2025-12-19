# catalog/constants.py

# Collar Types
COLLAR_CHOICES = [
    ('CREW_NECK', 'Crew Neck'),
    ('V_NECK', 'V-Neck'),
    ('POLO', 'Polo Collar'),
    ('HENLEY', 'Henley'),
    ('TURTLENECK', 'Turtleneck'),
    ('MOCK_NECK', 'Mock Neck'),
    ('HOODED', 'Hooded'),
    ('BAND_COLLAR', 'Band Collar'),
    ('MANDARIN', 'Mandarin Collar'),
    ('SPREAD', 'Spread Collar'),
    ('BUTTON_DOWN', 'Button Down Collar'),
    ('CAMP', 'Camp Collar'),
    ('NOTCH', 'Notch Lapel'),
    ('SHAWL', 'Shawl Collar'),
    ('NO_COLLAR', 'No Collar'),
    ('OTHER', 'Other'),
]

# Sleeve Types
SLEEVE_CHOICES = [
    ('SHORT', 'Short Sleeve'),
    ('LONG', 'Long Sleeve'),
    ('THREE_QUARTER', '3/4 Sleeve'),
    ('SLEEVELESS', 'Sleeveless'),
    ('RAGLAN', 'Raglan Sleeve'),
    ('DOLMAN', 'Dolman Sleeve'),
    ('BATWING', 'Batwing Sleeve'),
    ('BELL', 'Bell Sleeve'),
    ('PUFFED', 'Puffed Sleeve'),
    ('CUFFED', 'Cuffed Sleeve'),
    ('CAP', 'Cap Sleeve'),
    ('KIMONO', 'Kimono Sleeve'),
    ('OTHER', 'Other'),
]

# Pattern Choices
PATTERN_CHOICES = [
    ('SOLID', 'Solid'),
    ('STRIPED', 'Striped'),
    ('CHECKED', 'Checked/Plaid'),
    ('PRINTED', 'Printed'),
    ('DOTTED', 'Dotted/Polka Dot'),
    ('CAMOUFLAGE', 'Camouflage'),
    ('GRAPHIC', 'Graphic Print'),
    ('TIE_DYE', 'Tie-Dye'),
    ('EMBROIDERED', 'Embroidered'),
    ('JACQUARD', 'Jacquard'),
    ('TEXTURED', 'Textured'),
    ('FLORAL', 'Floral'),
    ('ANIMAL', 'Animal Print'),
    ('GEOMETRIC', 'Geometric'),
    ('ABSTRACT', 'Abstract'),
    ('OTHER', 'Other'),
]

# Fit Choices
FIT_CHOICES = [
        ('SLIM', 'Slim Fit'),
        ('REGULAR', 'Regular Fit'),
        ('LOOSE', 'Loose Fit'),
        ('OVERSIZED', 'Oversized'),
        ('TAILORED', 'Tailored Fit'),
        ('ATHLETIC', 'Athletic Fit'),
        ('RELAXED', 'Relaxed Fit'),
        ('SKINNY', 'Skinny Fit'),
        ('STRAIGHT', 'Straight Fit'),
        ('TAPERED', 'Tapered Fit'),
        ('BOXY', 'Boxy Fit'),
        ('BOOTCUT', 'Bootcut'),
        ('JOGGER', 'Jogger Fit'),
        ('CLASSIC', 'Classic Fit'),
        ('MODERN', 'Modern Fit'),
        ('CUSTOM', 'Custom Fit'),
        ('OTHER', 'Other'),
    ]

# Then in models.py
from .constants import COLLAR_CHOICES, SLEEVE_CHOICES, PATTERN_CHOICES, FIT_CHOICES