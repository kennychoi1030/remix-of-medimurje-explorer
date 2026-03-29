import gearImg from "@/assets/hk-product-gear.jpg";
import bootsImg from "@/assets/hk-product-boots.jpg";

export interface ProductData {
  id: string;
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  badge: string | null;
  created_at: string;
}

export const products: ProductData[] = [
  {
    id: "prod-1",
    image: gearImg,
    title: "Trail Explorer Pack",
    price: "HK$890",
    originalPrice: "HK$1,200",
    description: "30L hiking backpack with hydration system, trekking poles, and emergency kit.",
    badge: "Best Seller",
    created_at: "2026-01-01T08:00:00Z",
  },
  {
    id: "prod-2",
    image: bootsImg,
    title: "Summit Pro Hiking Boots",
    price: "HK$1,280",
    description: "Waterproof mid-cut boots with Vibram sole. Perfect for Hong Kong's rocky trails.",
    badge: null,
    created_at: "2026-01-05T08:00:00Z",
  },
  {
    id: "prod-3",
    image: gearImg,
    title: "Day Hike Essentials Kit",
    price: "HK$450",
    description: "First aid kit, headlamp, water purifier, and trail snacks — everything for a day out.",
    badge: "New",
    created_at: "2026-01-10T08:00:00Z",
  },
  {
    id: "prod-4",
    image: bootsImg,
    title: "Trail Runner Shoes",
    price: "HK$780",
    originalPrice: "HK$980",
    description: "Lightweight trail running shoes with excellent grip for fast-paced hikes.",
    badge: "Sale",
    created_at: "2026-01-15T08:00:00Z",
  },
];
