import sunsetImg from "@/assets/hk-event-sunset.jpg";
import nightImg from "@/assets/hk-event-night.jpg";

export interface EventData {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  spots: string;
  price: string;
  description: string;
  created_at: string;
  isFeatured: boolean;
}

export const events: EventData[] = [
  {
    id: "evt-1",
    image: sunsetImg,
    title: "Sunset Summit Hike",
    isFeatured: true,
    date: "April 12, 2026",
    location: "Lion Rock, Kowloon",
    spots: "20 spots left",
    price: "HK$280",
    description: "Watch the sun set over Victoria Harbour from Lion Rock's iconic summit. Includes guided hike and refreshments.",
    created_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "evt-2",
    image: nightImg,
    title: "Night Trail Adventure",
    isFeatured: true,
    date: "April 26, 2026",
    location: "Lantau Peak",
    spots: "15 spots left",
    price: "HK$350",
    description: "Experience Hong Kong's mountains after dark. Headlamp-lit trail with stargazing and hot drinks at the summit.",
    created_at: "2026-01-20T08:00:00Z",
  },
  {
    id: "evt-3",
    isFeatured: false,
    image: sunsetImg,
    title: "Beginner's Hike: The Peak Circle Walk",
    date: "May 3, 2026",
    location: "Victoria Peak",
    spots: "30 spots left",
    price: "HK$150",
    description: "A gentle introduction to Hong Kong hiking with stunning harbour views. Perfect for families and first-timers.",
    created_at: "2026-02-01T08:00:00Z",
  },
  {
    id: "evt-4",
    isFeatured: false,
    image: nightImg,
    title: "Photography Hike: Sai Kung Geopark",
    date: "May 10, 2026",
    location: "Sai Kung",
    spots: "12 spots left",
    price: "HK$380",
    description: "Capture stunning hexagonal rock columns and coastal scenery with a professional photographer guide.",
    created_at: "2026-02-10T08:00:00Z",
  },
  {
    id: "evt-5",
    isFeatured: false,
    image: sunsetImg,
    title: "Full Moon Hike: Tai Mo Shan",
    date: "May 17, 2026",
    location: "Tai Mo Shan",
    spots: "18 spots left",
    price: "HK$300",
    description: "Hike to Hong Kong's highest peak under the full moon. An unforgettable nocturnal adventure.",
    created_at: "2026-02-15T08:00:00Z",
  },
];
