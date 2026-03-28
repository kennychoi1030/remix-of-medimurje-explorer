import { Trail, BookingRecord } from "@/types/booking";
import coastalImg from "@/assets/hk-trail-coastal.jpg";
import jungleImg from "@/assets/hk-trail-jungle.jpg";
import dragonsBackImg from "@/assets/hk-trail-dragons-back.jpg";

// Simulate network delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mockTrails: Trail[] = [
  {
    id: "cape-daguilar",
    title: "Cape D'Aguilar Trail",
    price: 280,
    location: "Shek O, Hong Kong Island",
    duration: "3 hours",
    difficulty: "Moderate",
    distance: "7.5 km",
    elevation: "320 m",
    image: coastalImg,
    maxParticipants: 20,
    availableDates: ["2026-04-05", "2026-04-12", "2026-04-19", "2026-04-26", "2026-05-03"],
  },
  {
    id: "tai-mo-shan",
    title: "Tai Mo Shan Forest Walk",
    price: 350,
    location: "New Territories",
    duration: "4 hours",
    difficulty: "Easy",
    distance: "9 km",
    elevation: "450 m",
    image: jungleImg,
    maxParticipants: 15,
    availableDates: ["2026-04-06", "2026-04-13", "2026-04-20", "2026-04-27", "2026-05-04"],
  },
  {
    id: "dragons-back",
    title: "Dragon's Back",
    price: 220,
    location: "Shek O, Hong Kong Island",
    duration: "2.5 hours",
    difficulty: "Moderate",
    distance: "8.5 km",
    elevation: "284 m",
    image: dragonsBackImg,
    maxParticipants: 25,
    availableDates: ["2026-04-05", "2026-04-06", "2026-04-12", "2026-04-13", "2026-04-19"],
  },
];

const mockBookings: BookingRecord[] = [
  {
    id: "BK-001",
    trailId: "dragons-back",
    trailTitle: "Dragon's Back",
    date: "2026-04-12",
    participants: 2,
    name: "Alex Chan",
    email: "alex@example.com",
    phone: "+852 9123 4567",
    status: "confirmed",
    createdAt: "2026-03-25T10:30:00Z",
    totalPrice: 440,
  },
];

// --- Mock API functions (replace with real Laravel API calls) ---

export async function fetchTrails(): Promise<Trail[]> {
  await delay(800);
  return mockTrails;
}

export async function fetchTrailById(id: string): Promise<Trail | undefined> {
  await delay(500);
  return mockTrails.find((t) => t.id === id);
}

export async function fetchBookings(): Promise<BookingRecord[]> {
  await delay(600);
  return [...mockBookings];
}

export async function createBooking(data: {
  trailId: string;
  date: string;
  participants: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}): Promise<BookingRecord> {
  await delay(1000);
  const trail = mockTrails.find((t) => t.id === data.trailId);
  if (!trail) throw new Error("Trail not found");

  const booking: BookingRecord = {
    id: `BK-${String(mockBookings.length + 1).padStart(3, "0")}`,
    trailId: data.trailId,
    trailTitle: trail.title,
    date: data.date,
    participants: data.participants,
    name: data.name,
    email: data.email,
    phone: data.phone,
    status: "pending",
    createdAt: new Date().toISOString(),
    totalPrice: trail.price * data.participants,
  };
  mockBookings.push(booking);
  return booking;
}
