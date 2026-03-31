import gearImg from "@/assets/hk-product-gear.jpg";
import bootsImg from "@/assets/hk-product-boots.jpg";
import type { Localizable } from "@/types/i18n";

export interface ProductData {
  id: string;
  image: string;
  title: Localizable;
  price: string;
  originalPrice?: string;
  description: Localizable;
  badge: string | null;
  created_at: string;
  isFeatured: boolean;
}

export const products: ProductData[] = [
  {
    id: "prod-1",
    isFeatured: true,
    image: gearImg,
    title: { en: "Trail Explorer Pack", zh: "越野探索背包" },
    price: "HK$890",
    originalPrice: "HK$1,200",
    description: {
      en: "30L hiking backpack with hydration system, trekking poles, and emergency kit.",
      zh: "30L 行山背包，配備飲水系統、行山杖及急救套裝。",
    },
    badge: "Best Seller",
    created_at: "2026-01-01T08:00:00Z",
  },
  {
    id: "prod-2",
    isFeatured: true,
    image: bootsImg,
    title: { en: "Summit Pro Hiking Boots", zh: "Summit Pro 行山鞋" },
    price: "HK$1,280",
    description: {
      en: "Waterproof mid-cut boots with Vibram sole. Perfect for Hong Kong's rocky trails.",
      zh: "防水中筒行山鞋，配備 Vibram 鞋底，完美適合香港的岩石步道。",
    },
    badge: null,
    created_at: "2026-01-05T08:00:00Z",
  },
  {
    id: "prod-3",
    isFeatured: true,
    image: gearImg,
    title: { en: "Day Hike Essentials Kit", zh: "一日行山必備套裝" },
    price: "HK$450",
    description: {
      en: "First aid kit, headlamp, water purifier, and trail snacks — everything for a day out.",
      zh: "急救包、頭燈、淨水器與行山零食 — 一日行山所需一應俱全。",
    },
    badge: "New",
    created_at: "2026-01-10T08:00:00Z",
  },
  {
    id: "prod-4",
    isFeatured: true,
    image: bootsImg,
    title: { en: "Trail Runner Shoes", zh: "越野跑鞋" },
    price: "HK$780",
    originalPrice: "HK$980",
    description: {
      en: "Lightweight trail running shoes with excellent grip for fast-paced hikes.",
      zh: "輕量越野跑鞋，抓地力出色，適合快速行山。",
    },
    badge: "Sale",
    created_at: "2026-01-15T08:00:00Z",
  },
];
