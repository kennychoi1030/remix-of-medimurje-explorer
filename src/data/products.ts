import gearImg from "@/assets/hk-product-gear.jpg";
import bootsImg from "@/assets/hk-product-boots.jpg";
import type { Localizable } from "@/types/i18n";

export type ProductCategory = "footwear" | "bags" | "gear";

export interface FootwearSpecs {
  gender: Localizable;
  sizes: number[];
  material: Localizable;
  waterproof: boolean;
}

export interface BagSpecs {
  capacity: string;
  dimensions: Localizable;
  weight: string;
  material: Localizable;
}

export interface GearSpecs {
  includes: Localizable[];
  weight: string;
}

export type ProductSpecs = FootwearSpecs | BagSpecs | GearSpecs;

export interface ProductData {
  id: string;
  slug: string;
  image: string;
  images: string[];
  title: Localizable;
  price: string;
  originalPrice?: string;
  description: Localizable;
  badge: string | null;
  created_at: string;
  isFeatured: boolean;
  category: ProductCategory;
  specs: ProductSpecs;
}

export const products: ProductData[] = [
  {
    id: "prod-1",
    slug: "trail-explorer-pack",
    isFeatured: true,
    image: gearImg,
    images: [gearImg, bootsImg, gearImg],
    title: { en: "Trail Explorer Pack", zh: "越野探索背包" },
    price: "HK$890",
    originalPrice: "HK$1,200",
    description: {
      en: "30L hiking backpack with hydration system, trekking poles, and emergency kit. Perfect for day hikes and overnight adventures in Hong Kong's country parks.",
      zh: "30L 行山背包，配備飲水系統、行山杖及急救套裝。完美適合香港郊野公園的日間行山及過夜探險。",
    },
    badge: "Best Seller",
    created_at: "2026-01-01T08:00:00Z",
    category: "bags",
    specs: {
      capacity: "30L",
      dimensions: { en: "55 × 30 × 20 cm", zh: "55 × 30 × 20 厘米" },
      weight: "1.2 kg",
      material: { en: "Ripstop Nylon 210D", zh: "防撕裂尼龍 210D" },
    } as BagSpecs,
  },
  {
    id: "prod-2",
    slug: "summit-pro-hiking-boots",
    isFeatured: true,
    image: bootsImg,
    images: [bootsImg, gearImg, bootsImg],
    title: { en: "Summit Pro Hiking Boots", zh: "Summit Pro 行山鞋" },
    price: "HK$1,280",
    description: {
      en: "Waterproof mid-cut boots with Vibram sole. Perfect for Hong Kong's rocky trails. Features breathable Gore-Tex lining and reinforced toe cap.",
      zh: "防水中筒行山鞋，配備 Vibram 鞋底，完美適合香港的岩石步道。採用透氣 Gore-Tex 內襯及加固鞋頭。",
    },
    badge: null,
    created_at: "2026-01-05T08:00:00Z",
    category: "footwear",
    specs: {
      gender: { en: "Unisex", zh: "男女通用" },
      sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      material: { en: "Full-grain Leather + Gore-Tex", zh: "全粒面皮革 + Gore-Tex" },
      waterproof: true,
    } as FootwearSpecs,
  },
  {
    id: "prod-3",
    slug: "day-hike-essentials-kit",
    isFeatured: true,
    image: gearImg,
    images: [gearImg, bootsImg],
    title: { en: "Day Hike Essentials Kit", zh: "一日行山必備套裝" },
    price: "HK$450",
    description: {
      en: "First aid kit, headlamp, water purifier, and trail snacks — everything for a day out on Hong Kong's trails.",
      zh: "急救包、頭燈、淨水器與行山零食 — 一日行山所需一應俱全。",
    },
    badge: "New",
    created_at: "2026-01-10T08:00:00Z",
    category: "gear",
    specs: {
      includes: [
        { en: "First Aid Kit (42 pieces)", zh: "急救包（42 件）" },
        { en: "LED Headlamp (300 lumens)", zh: "LED 頭燈（300 流明）" },
        { en: "Portable Water Purifier", zh: "便攜式淨水器" },
        { en: "Energy Bars × 4", zh: "能量棒 × 4" },
      ],
      weight: "0.8 kg",
    } as GearSpecs,
  },
  {
    id: "prod-4",
    slug: "trail-runner-shoes",
    isFeatured: true,
    image: bootsImg,
    images: [bootsImg, gearImg],
    title: { en: "Trail Runner Shoes", zh: "越野跑鞋" },
    price: "HK$780",
    originalPrice: "HK$980",
    description: {
      en: "Lightweight trail running shoes with excellent grip for fast-paced hikes. Features responsive cushioning and breathable mesh upper.",
      zh: "輕量越野跑鞋，抓地力出色，適合快速行山。採用回彈緩震及透氣網面鞋面。",
    },
    badge: "Sale",
    created_at: "2026-01-15T08:00:00Z",
    category: "footwear",
    specs: {
      gender: { en: "Unisex", zh: "男女通用" },
      sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
      material: { en: "Breathable Mesh + TPU Overlay", zh: "透氣網面 + TPU 覆層" },
      waterproof: false,
    } as FootwearSpecs,
  },
];
