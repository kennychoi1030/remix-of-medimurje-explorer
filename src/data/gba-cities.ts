import shenzhenImg from "@/assets/city-shenzhen.jpg";
import guangzhouImg from "@/assets/city-guangzhou.jpg";
import zhuhaiImg from "@/assets/city-zhuhai.jpg";
import macauImg from "@/assets/city-macau.jpg";
import hongkongImg from "@/assets/city-hongkong.jpg";

export type CategoryFilter = "all" | "culture" | "nature" | "shopping";

export interface CityActivity {
  id: string;
  title: string;
  category: CategoryFilter;
  description: string;
}

export interface GBACity {
  id: string;
  name: string;
  nameZh: string;
  image: string;
  description: string;
  activities: CityActivity[];
}

export const gbaCities: GBACity[] = [
  {
    id: "shenzhen",
    name: "Shenzhen",
    nameZh: "深圳",
    image: shenzhenImg,
    description: "A futuristic tech hub where innovation meets stunning coastal trails and vibrant nightlife.",
    activities: [
      { id: "sz-1", title: "OCT Loft Creative Park", category: "culture", description: "Art galleries and creative studios" },
      { id: "sz-2", title: "Wutong Mountain Hike", category: "nature", description: "Panoramic city and sea views" },
      { id: "sz-3", title: "Luohu Commercial City", category: "shopping", description: "Iconic cross-border shopping district" },
      { id: "sz-4", title: "Dameisha Beach", category: "nature", description: "Golden sand beach with mountain backdrop" },
      { id: "sz-5", title: "SEG Electronics Market", category: "shopping", description: "World-famous electronics bazaar" },
    ],
  },
  {
    id: "guangzhou",
    name: "Guangzhou",
    nameZh: "廣州",
    image: guangzhouImg,
    description: "Ancient trading port renowned for dim sum culture, colonial architecture, and the iconic Canton Tower.",
    activities: [
      { id: "gz-1", title: "Chen Clan Ancestral Hall", category: "culture", description: "Ornate Qing dynasty architecture" },
      { id: "gz-2", title: "Baiyun Mountain", category: "nature", description: "Lush urban mountain retreat" },
      { id: "gz-3", title: "Beijing Road Pedestrian Street", category: "shopping", description: "Historic shopping boulevard" },
      { id: "gz-4", title: "Canton Tower Night Tour", category: "culture", description: "Dazzling skyline observation deck" },
      { id: "gz-5", title: "Shamian Island Walk", category: "culture", description: "European colonial heritage precinct" },
    ],
  },
  {
    id: "zhuhai",
    name: "Zhuhai",
    nameZh: "珠海",
    image: zhuhaiImg,
    description: "A romantic seaside garden city with laid-back island vibes and stunning coastline views.",
    activities: [
      { id: "zh-1", title: "Fisher Girl Statue", category: "culture", description: "Iconic waterfront landmark" },
      { id: "zh-2", title: "Dong'ao Island", category: "nature", description: "Crystal-clear waters and diving" },
      { id: "zh-3", title: "Gongbei Underground Market", category: "shopping", description: "Cross-border bargain hunting" },
      { id: "zh-4", title: "Lovers' Road Coastal Walk", category: "nature", description: "28 km seaside promenade" },
    ],
  },
  {
    id: "macau",
    name: "Macau",
    nameZh: "澳門",
    image: macauImg,
    description: "Where Portuguese heritage meets Chinese tradition — a UNESCO World Heritage wonderland of food and culture.",
    activities: [
      { id: "mc-1", title: "Ruins of St. Paul's", category: "culture", description: "Iconic 17th-century church facade" },
      { id: "mc-2", title: "Coloane Trail", category: "nature", description: "Peaceful hiking through lush hills" },
      { id: "mc-3", title: "Senado Square", category: "shopping", description: "Portuguese-style shopping plaza" },
      { id: "mc-4", title: "A-Ma Temple", category: "culture", description: "Ancient Taoist temple complex" },
    ],
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    nameZh: "香港",
    image: hongkongImg,
    description: "Asia's world city — a dazzling blend of harbour skylines, mountain trails, and street-food culture.",
    activities: [
      { id: "hk-1", title: "Victoria Peak Tram", category: "culture", description: "Legendary harbour panorama" },
      { id: "hk-2", title: "Dragon's Back Trail", category: "nature", description: "Award-winning coastal hike" },
      { id: "hk-3", title: "Temple Street Night Market", category: "shopping", description: "Vibrant night bazaar" },
      { id: "hk-4", title: "Lantau Big Buddha", category: "culture", description: "Tian Tan Buddha and monastery" },
      { id: "hk-5", title: "MacLehose Trail Section 2", category: "nature", description: "Epic mountain ridge walk" },
      { id: "hk-6", title: "Harbour City", category: "shopping", description: "Luxury waterfront mall" },
    ],
  },
];
