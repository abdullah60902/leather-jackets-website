export const jacketTypes = [
  {
    id: "classic-biker",
    name: "Classic Biker",
    description: "Timeless asymmetric zip design",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&q=80",
    basePrice: 450,
  },
  {
    id: "bomber",
    name: "Bomber Jacket",
    description: "Military-inspired aviation style",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop&q=80",
    basePrice: 420,
  },
  {
    id: "racer",
    name: "Café Racer",
    description: "Minimalist racing heritage",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=600&fit=crop&q=80",
    basePrice: 480,
  },
  {
    id: "aviator",
    name: "Aviator",
    description: "Shearling-lined luxury warmth",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=600&fit=crop&q=80",
    basePrice: 650,
  },
];

export const leatherTypes = [
  {
    id: "nappa",
    name: "Nappa Leather",
    description: "Soft, supple, premium quality",
    priceModifier: 0,
  },
  {
    id: "full-grain",
    name: "Full-Grain",
    description: "Durable, natural texture",
    priceModifier: 50,
  },
  {
    id: "suede",
    name: "Suede",
    description: "Velvety, luxurious finish",
    priceModifier: 80,
  },
  {
    id: "patent",
    name: "Patent Leather",
    description: "High-gloss, statement finish",
    priceModifier: 100,
  },
];

export const finishOptions = [
  { id: "matte", name: "Matte", priceModifier: 0 },
  { id: "gloss", name: "Gloss", priceModifier: 20 },
  { id: "vintage", name: "Vintage Distressed", priceModifier: 40 },
  { id: "waxed", name: "Waxed", priceModifier: 30 },
];

export const colorPalette = [
  { id: "black", name: "Midnight Black", hex: "#0a0a0a" },
  { id: "brown", name: "Cognac Brown", hex: "#8b4513" },
  { id: "tan", name: "Caramel Tan", hex: "#d2691e" },
  { id: "burgundy", name: "Burgundy", hex: "#800020" },
  { id: "navy", name: "Navy Blue", hex: "#1e3a5f" },
  { id: "olive", name: "Olive Green", hex: "#556b2f" },
  { id: "grey", name: "Charcoal Grey", hex: "#36454f" },
  { id: "white", name: "Ivory White", hex: "#fffff0" },
];

export const stitchingStyles = [
  { id: "standard", name: "Standard", priceModifier: 0 },
  { id: "contrast", name: "Contrast Stitching", priceModifier: 25 },
  { id: "double", name: "Double Stitch", priceModifier: 35 },
  { id: "hand", name: "Hand-Stitched", priceModifier: 150 },
];

export const hardwareOptions = [
  { id: "silver", name: "Silver Chrome", priceModifier: 0 },
  { id: "gold", name: "Gold Brass", priceModifier: 40 },
  { id: "gunmetal", name: "Gunmetal", priceModifier: 30 },
  { id: "rose-gold", name: "Rose Gold", priceModifier: 50 },
];

export const collarStyles = [
  { id: "standard", name: "Standard Collar", priceModifier: 0 },
  { id: "mandarin", name: "Mandarin Collar", priceModifier: 20 },
  { id: "shawl", name: "Shawl Collar", priceModifier: 30 },
  { id: "hooded", name: "Detachable Hood", priceModifier: 60 },
];

export const liningOptions = [
  { id: "polyester", name: "Polyester (Standard)", priceModifier: 0 },
  { id: "satin", name: "Satin", priceModifier: 40 },
  { id: "quilted", name: "Quilted Thermal", priceModifier: 60 },
  { id: "shearling", name: "Shearling", priceModifier: 150 },
];

export const weatherResistance = [
  { id: "none", name: "None", priceModifier: 0 },
  { id: "water-resistant", name: "Water-Resistant Coating", priceModifier: 50 },
  { id: "waterproof", name: "Waterproof Membrane", priceModifier: 100 },
];

export const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const logoTechniques = [
  { id: "embroidery", name: "Embroidery", priceModifier: 30 },
  { id: "print", name: "Screen Print", priceModifier: 20 },
  { id: "emboss", name: "Leather Emboss", priceModifier: 50 },
  { id: "patch", name: "Leather Patch", priceModifier: 40 },
];

export const logoPlacement = [
  { id: "chest-left", name: "Chest (Left)" },
  { id: "chest-right", name: "Chest (Right)" },
  { id: "back-center", name: "Back (Center)" },
  { id: "back-top", name: "Back (Upper)" },
  { id: "sleeve-left", name: "Left Sleeve" },
  { id: "sleeve-right", name: "Right Sleeve" },
];

export const bulkDiscounts = [
  { minQty: 10, maxQty: 24, discount: 0 },
  { minQty: 25, maxQty: 49, discount: 5 },
  { minQty: 50, maxQty: 99, discount: 10 },
  { minQty: 100, maxQty: 249, discount: 15 },
  { minQty: 250, maxQty: 499, discount: 20 },
  { minQty: 500, maxQty: Infinity, discount: 25 },
];
