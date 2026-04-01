/**
 * Schema-driven product spec definitions.
 * UI must iterate (map) over these to render form fields — never hardcode inputs per category.
 * Each field definition maps to a form control type.
 *
 * Future-proof: add a new category by simply adding an entry here.
 * The specs JSON is designed for MySQL JSON columns / Laravel casts.
 */

export type SpecFieldType = "text" | "number" | "select" | "boolean" | "sizes";

export interface SpecFieldDef {
  /** Machine key stored in the specs JSON object */
  key: string;
  /** i18n translation key under "specs.<key>". Falls back to raw key if missing. */
  labelKey: string;
  type: SpecFieldType;
  /** Only for "select" type */
  options?: string[];
  /** Placeholder hint */
  placeholder?: string;
  required?: boolean;
}

export interface CategorySchema {
  label: string;
  labelKey: string;
  fields: SpecFieldDef[];
}

export const categorySchemas: Record<string, CategorySchema> = {
  clothes: {
    label: "Clothes",
    labelKey: "specs.categories.clothes",
    fields: [
      { key: "gender", labelKey: "specs.gender", type: "select", options: ["Unisex", "Men", "Women"], required: true },
      { key: "sizes", labelKey: "specs.sizes", type: "sizes", placeholder: "e.g. S,M,L,XL" },
      { key: "material", labelKey: "specs.material", type: "text", placeholder: "e.g. Polyester Blend" },
      { key: "waterproof", labelKey: "specs.waterproof", type: "boolean" },
      { key: "weight", labelKey: "specs.weight", type: "text", placeholder: "e.g. 0.3 kg" },
    ],
  },
  shoes: {
    label: "Shoes",
    labelKey: "specs.categories.shoes",
    fields: [
      { key: "gender", labelKey: "specs.gender", type: "select", options: ["Unisex", "Men", "Women"], required: true },
      { key: "sizes", labelKey: "specs.sizes", type: "sizes", placeholder: "e.g. 36,37,38,39,40,41,42" },
      { key: "material", labelKey: "specs.material", type: "text", placeholder: "e.g. Full-grain Leather" },
      { key: "waterproof", labelKey: "specs.waterproof", type: "boolean" },
      { key: "weight", labelKey: "specs.weight", type: "text", placeholder: "e.g. 0.6 kg" },
    ],
  },
  bags: {
    label: "Bags",
    labelKey: "specs.categories.bags",
    fields: [
      { key: "capacity", labelKey: "specs.capacity", type: "text", placeholder: "e.g. 30L", required: true },
      { key: "dimensions", labelKey: "specs.dimensions", type: "text", placeholder: "e.g. 55 × 30 × 20 cm" },
      { key: "weight", labelKey: "specs.weight", type: "text", placeholder: "e.g. 1.2 kg" },
      { key: "material", labelKey: "specs.material", type: "text", placeholder: "e.g. Ripstop Nylon" },
      { key: "waterproof", labelKey: "specs.waterproof", type: "boolean" },
    ],
  },
};

/** All available category keys */
export const categoryKeys = Object.keys(categorySchemas);
