// src/constants/measurementSchemas.js

export const MEASUREMENT_PROFILES = [
  { value: "TOPS", label: "Men Tops (T-shirt/Shirt/Kurta/Hoodie)" },
  { value: "BOTTOMS", label: "Men Bottoms (Jeans/Trousers/Chinos)" },
  { value: "OUTERWEAR", label: "Men Outerwear (Jacket/Blazer)" },
  { value: "SHORTS", label: "Men Shorts" },
];

export const MEASUREMENT_COLUMNS = {
  TOPS: [
    { key: "size", label: "Size", placeholder: "S/M/L/XL" },
    { key: "chest", label: "Chest", placeholder: "40" },
    { key: "shoulder", label: "Shoulder", placeholder: "17" },
    { key: "length", label: "Length", placeholder: "27" },
    { key: "sleeve_length", label: "Sleeve", placeholder: "24" },
  ],
  BOTTOMS: [
    { key: "size", label: "Size", placeholder: "30/32/34" },
    { key: "waist", label: "Waist", placeholder: "32" },
    { key: "hip", label: "Hip", placeholder: "40" },
    { key: "thigh", label: "Thigh", placeholder: "24" },
    { key: "inseam", label: "Inseam", placeholder: "30" },
    { key: "outseam", label: "Outseam", placeholder: "40" },
    { key: "leg_opening", label: "Leg Opening", placeholder: "14" },
  ],
  OUTERWEAR: [
    { key: "size", label: "Size", placeholder: "M/L/XL" },
    { key: "chest", label: "Chest", placeholder: "42" },
    { key: "shoulder", label: "Shoulder", placeholder: "18" },
    { key: "length", label: "Length", placeholder: "28" },
    { key: "sleeve_length", label: "Sleeve", placeholder: "25" },
  ],
  SHORTS: [
    { key: "size", label: "Size", placeholder: "30/32/34" },
    { key: "waist", label: "Waist", placeholder: "32" },
    { key: "hip", label: "Hip", placeholder: "40" },
    { key: "thigh", label: "Thigh", placeholder: "24" },
    { key: "outseam", label: "Length", placeholder: "18" },
    { key: "leg_opening", label: "Leg Opening", placeholder: "22" },
  ],
};
