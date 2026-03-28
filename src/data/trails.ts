import coastalImg from "@/assets/hk-trail-coastal.jpg";
import jungleImg from "@/assets/hk-trail-jungle.jpg";
import dragonsBackImg from "@/assets/hk-trail-dragons-back.jpg";
import dragonsBack2 from "@/assets/trail-dragons-back-2.jpg";
import dragonsBack3 from "@/assets/trail-dragons-back-3.jpg";
import coastal2 from "@/assets/trail-coastal-2.jpg";
import jungle2 from "@/assets/trail-jungle-2.jpg";

export interface TrailData {
  slug: string;
  image: string;
  title: string;
  location: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  distance: string;
  elevation: string;
  bestSeason: string;
  description: string;
  longDescription: string;
  highlights: string[];
  gallery: string[];
  elevationProfile: { km: number; elevation: number }[];
  routeSteps: { title: string; description: string }[];
}

export const trails: TrailData[] = [
  {
    slug: "cape-daguilar",
    image: coastalImg,
    title: "Cape D'Aguilar Trail",
    location: "Shek O, Hong Kong Island",
    duration: "3 hours",
    difficulty: "Moderate",
    distance: "7.5 km",
    elevation: "320 m",
    bestSeason: "Oct – Mar",
    description:
      "A stunning coastal hike along dramatic sea cliffs with panoramic views of the South China Sea and secluded beaches.",
    longDescription:
      "Cape D'Aguilar Marine Reserve sits at the southeastern tip of Hong Kong Island, offering one of the territory's most spectacular coastal walks. The trail meanders along volcanic rock formations, past tide pools teeming with marine life, and through windswept grasslands overlooking the open sea. The historic Cape D'Aguilar Lighthouse, built in 1875, marks the halfway point and provides a perfect rest stop with unobstructed ocean views.",
    highlights: [
      "Cape D'Aguilar Lighthouse (1875)",
      "Volcanic rock formations & tide pools",
      "Panoramic South China Sea views",
      "Secluded Hok Tsui beach",
      "Marine Reserve wildlife spotting",
    ],
    gallery: [coastalImg, coastal2],
    elevationProfile: [
      { km: 0, elevation: 40 },
      { km: 1, elevation: 120 },
      { km: 2, elevation: 200 },
      { km: 3, elevation: 280 },
      { km: 4, elevation: 320 },
      { km: 5, elevation: 250 },
      { km: 6, elevation: 150 },
      { km: 7, elevation: 80 },
      { km: 7.5, elevation: 40 },
    ],
    routeSteps: [
      { title: "Shek O Road Bus Stop", description: "Start at the bus terminus and head south along the paved road toward the cape." },
      { title: "Cape D'Aguilar Road", description: "Follow the gentle descent through coastal scrubland with views opening up to the east." },
      { title: "Marine Reserve Entrance", description: "Enter the reserve and explore the rocky shoreline and tide pools." },
      { title: "Historic Lighthouse", description: "Reach the 1875 lighthouse — the perfect photo opportunity and rest point." },
      { title: "Return via Ridge Path", description: "Take the elevated ridge path back for sweeping panoramic views of the coastline." },
    ],
  },
  {
    slug: "tai-mo-shan",
    image: jungleImg,
    title: "Tai Mo Shan Forest Walk",
    location: "New Territories",
    duration: "4 hours",
    difficulty: "Easy",
    distance: "9 km",
    elevation: "450 m",
    bestSeason: "Nov – Feb",
    description:
      "Wander through lush subtropical forest to Hong Kong's highest peak, discovering waterfalls and rare flora along the way.",
    longDescription:
      "At 957 metres, Tai Mo Shan is Hong Kong's tallest mountain, and the forest walk to its summit is one of the territory's most rewarding nature experiences. The trail winds through dense subtropical woodland, past cascading streams and waterfalls, and through groves of rhododendrons that bloom in vivid colour during spring. On clear days the summit offers 360-degree views stretching from Shenzhen to Lantau Island.",
    highlights: [
      "Hong Kong's highest peak (957 m)",
      "Subtropical forest canopy",
      "Seasonal waterfalls & streams",
      "Rhododendron groves (spring bloom)",
      "360° panoramic summit views",
    ],
    gallery: [jungleImg, jungle2],
    elevationProfile: [
      { km: 0, elevation: 490 },
      { km: 1, elevation: 560 },
      { km: 2, elevation: 640 },
      { km: 3, elevation: 720 },
      { km: 4, elevation: 810 },
      { km: 5, elevation: 880 },
      { km: 6, elevation: 940 },
      { km: 7, elevation: 957 },
      { km: 8, elevation: 800 },
      { km: 9, elevation: 490 },
    ],
    routeSteps: [
      { title: "Route Twisk Car Park", description: "Begin at the Route Twisk parking area where trail markers guide you into the forest." },
      { title: "Forest Canopy Section", description: "Enter the dense subtropical woodland with a gentle, shaded incline." },
      { title: "Waterfall Viewpoint", description: "A short detour leads to a beautiful cascade, especially dramatic after rain." },
      { title: "Rhododendron Grove", description: "Pass through groves of native rhododendrons — spectacular during spring blooms." },
      { title: "Summit Approach & Return", description: "The final push to the radar station at 957 m before descending the eastern slope." },
    ],
  },
  {
    slug: "dragons-back",
    image: dragonsBackImg,
    title: "Dragon's Back",
    location: "Shek O, Hong Kong Island",
    duration: "2.5 hours",
    difficulty: "Moderate",
    distance: "8.5 km",
    elevation: "284 m",
    bestSeason: "Oct – Apr",
    description:
      "Named Asia's best urban hike, this iconic ridge trail offers sweeping views of the coastline and city skyline.",
    longDescription:
      "Dragon's Back is Hong Kong's most celebrated trail, consistently ranked among the world's great urban hikes. The undulating ridge — said to resemble the spine of a dragon — provides constantly changing vistas of Shek O, Big Wave Bay, the South China Sea, and the distant skyscrapers of Hong Kong Island. The trail is well-maintained with clear signage, making it accessible to hikers of all experience levels while still delivering a genuinely dramatic landscape experience.",
    highlights: [
      "Asia's best urban hike (Time Magazine)",
      "Dramatic ridge-line panoramas",
      "Views of Shek O & Big Wave Bay",
      "Well-maintained, family-friendly trail",
      "Optional beach finish at Big Wave Bay",
    ],
    gallery: [dragonsBackImg, dragonsBack2, dragonsBack3],
    elevationProfile: [
      { km: 0, elevation: 50 },
      { km: 1, elevation: 150 },
      { km: 2, elevation: 240 },
      { km: 3, elevation: 284 },
      { km: 4, elevation: 260 },
      { km: 5, elevation: 200 },
      { km: 6, elevation: 140 },
      { km: 7, elevation: 80 },
      { km: 8, elevation: 30 },
      { km: 8.5, elevation: 10 },
    ],
    routeSteps: [
      { title: "To Tei Wan (Trailhead)", description: "Alight at the To Tei Wan bus stop and follow signs to Section 8 of the Hong Kong Trail." },
      { title: "Shek O Peak", description: "Climb steadily to the ridge where the panoramic views begin to unfold." },
      { title: "Dragon's Back Ridge", description: "Walk the iconic undulating ridge with 360° views of sea, beaches, and skyline." },
      { title: "Descent to Tai Long Wan", description: "A gentle downhill through woodland toward the coast." },
      { title: "Big Wave Bay Beach", description: "End at the sandy beach — perfect for a swim or a cold drink at the local café." },
    ],
  },
];
