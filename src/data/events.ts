import sunsetImg from "@/assets/hk-event-sunset.jpg";
import nightImg from "@/assets/hk-event-night.jpg";
import type { Localizable } from "@/types/i18n";

export interface EventData {
  id: string;
  image: string;
  title: Localizable;
  date: string;
  location: string;
  spots: string;
  price: string;
  description: Localizable;
  created_at: string;
  isFeatured: boolean;
}

export const events: EventData[] = [
  {
    id: "evt-1",
    image: sunsetImg,
    title: { en: "Sunset Summit Hike", zh: "日落登頂行山" },
    isFeatured: true,
    date: "April 12, 2026",
    location: "Lion Rock, Kowloon",
    spots: "20 spots left",
    price: "HK$280",
    description: {
      en: "Watch the sun set over Victoria Harbour from Lion Rock's iconic summit. Includes guided hike and refreshments.",
      zh: "從獅子山標誌性山頂觀賞維多利亞港日落，包括導賞行山及茶點。",
    },
    created_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "evt-2",
    image: nightImg,
    title: { en: "Night Trail Adventure", zh: "夜間行山探險" },
    isFeatured: true,
    date: "April 26, 2026",
    location: "Lantau Peak",
    spots: "15 spots left",
    price: "HK$350",
    description: {
      en: "Experience Hong Kong's mountains after dark. Headlamp-lit trail with stargazing and hot drinks at the summit.",
      zh: "體驗香港的夜間山嶺。頭燈照路、山頂觀星與熱飲。",
    },
    created_at: "2026-01-20T08:00:00Z",
  },
  {
    id: "evt-3",
    isFeatured: false,
    image: sunsetImg,
    title: { en: "Beginner's Hike: The Peak Circle Walk", zh: "新手行山：太平山環迴步行徑" },
    date: "May 3, 2026",
    location: "Victoria Peak",
    spots: "30 spots left",
    price: "HK$150",
    description: {
      en: "A gentle introduction to Hong Kong hiking with stunning harbour views. Perfect for families and first-timers.",
      zh: "輕鬆的香港行山入門路線，可欣賞壯麗海港景色，適合家庭及初次行山者。",
    },
    created_at: "2026-02-01T08:00:00Z",
  },
  {
    id: "evt-4",
    isFeatured: false,
    image: nightImg,
    title: { en: "Photography Hike: Sai Kung Geopark", zh: "攝影行山：西貢地質公園" },
    date: "May 10, 2026",
    location: "Sai Kung",
    spots: "12 spots left",
    price: "HK$380",
    description: {
      en: "Capture stunning hexagonal rock columns and coastal scenery with a professional photographer guide.",
      zh: "由專業攝影師帶領，拍攝壯觀的六角岩柱與海岸風光。",
    },
    created_at: "2026-02-10T08:00:00Z",
  },
  {
    id: "evt-5",
    isFeatured: false,
    image: sunsetImg,
    title: { en: "Full Moon Hike: Tai Mo Shan", zh: "滿月行山：大帽山" },
    date: "May 17, 2026",
    location: "Tai Mo Shan",
    spots: "18 spots left",
    price: "HK$300",
    description: {
      en: "Hike to Hong Kong's highest peak under the full moon. An unforgettable nocturnal adventure.",
      zh: "在滿月下登上香港最高峰，一次難忘的夜間冒險。",
    },
    created_at: "2026-02-15T08:00:00Z",
  },
];
