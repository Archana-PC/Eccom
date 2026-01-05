// src/constants/productChoices.js

export const FIT_CHOICES = [
  { value: "SLIM", label: "Slim Fit" },
  { value: "REGULAR", label: "Regular Fit" },
  { value: "LOOSE", label: "Loose Fit" },
  { value: "OVERSIZED", label: "Oversized" },
  { value: "TAILORED", label: "Tailored Fit" },
  { value: "ATHLETIC", label: "Athletic Fit" },
  { value: "RELAXED", label: "Relaxed Fit" },
  { value: "SKINNY", label: "Skinny Fit" },
  { value: "STRAIGHT", label: "Straight Fit" },
  { value: "TAPERED", label: "Tapered Fit" },
  { value: "BOXY", label: "Boxy Fit" },
  { value: "BOOTCUT", label: "Bootcut" },
  { value: "JOGGER", label: "Jogger Fit" },
  { value: "CLASSIC", label: "Classic Fit" },
  { value: "MODERN", label: "Modern Fit" },
  { value: "CUSTOM", label: "Custom Fit" },
  { value: "OTHER", label: "Other" },
];

export const COLLAR_CHOICES = [
  { value: "CREW_NECK", label: "Crew Neck" },
  { value: "V_NECK", label: "V-Neck" },
  { value: "POLO", label: "Polo Collar" },
  { value: "HENLEY", label: "Henley" },
  { value: "TURTLENECK", label: "Turtleneck" },
  { value: "MOCK_NECK", label: "Mock Neck" },
  { value: "HOODED", label: "Hooded" },
  { value: "BAND_COLLAR", label: "Band Collar" },
  { value: "MANDARIN", label: "Mandarin Collar" },
  { value: "SPREAD", label: "Spread Collar" },
  { value: "BUTTON_DOWN", label: "Button Down Collar" },
  { value: "CAMP", label: "Camp Collar" },
  { value: "NOTCH", label: "Notch Lapel" },
  { value: "SHAWL", label: "Shawl Collar" },
  { value: "NO_COLLAR", label: "No Collar" },
  { value: "OTHER", label: "Other" },
];

export const SLEEVE_CHOICES = [
  { value: "SHORT", label: "Short Sleeve" },
  { value: "LONG", label: "Long Sleeve" },
  { value: "THREE_QUARTER", label: "3/4 Sleeve" },
  { value: "SLEEVELESS", label: "Sleeveless" },
  { value: "RAGLAN", label: "Raglan Sleeve" },
  { value: "DOLMAN", label: "Dolman Sleeve" },
  { value: "BATWING", label: "Batwing Sleeve" },
  { value: "BELL", label: "Bell Sleeve" },
  { value: "PUFFED", label: "Puffed Sleeve" },
  { value: "CUFFED", label: "Cuffed Sleeve" },
  { value: "CAP", label: "Cap Sleeve" },
  { value: "KIMONO", label: "Kimono Sleeve" },
  { value: "OTHER", label: "Other" },
];

export const PATTERN_CHOICES = [
  { value: "SOLID", label: "Solid" },
  { value: "STRIPED", label: "Striped" },
  { value: "CHECKED", label: "Checked/Plaid" },
  { value: "PRINTED", label: "Printed" },
  { value: "DOTTED", label: "Dotted/Polka Dot" },
  { value: "CAMOUFLAGE", label: "Camouflage" },
  { value: "GRAPHIC", label: "Graphic Print" },
  { value: "TIE_DYE", label: "Tie-Dye" },
  { value: "EMBROIDERED", label: "Embroidered" },
  { value: "JACQUARD", label: "Jacquard" },
  { value: "TEXTURED", label: "Textured" },
  { value: "FLORAL", label: "Floral" },
  { value: "ANIMAL", label: "Animal Print" },
  { value: "GEOMETRIC", label: "Geometric" },
  { value: "ABSTRACT", label: "Abstract" },
  { value: "OTHER", label: "Other" },
];

// ✅ optional helper if you want
export const toOptions = (choices) => choices.map((c) => ({ value: c.value, label: c.label }));
