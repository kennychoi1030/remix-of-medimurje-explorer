export interface Trail {
  id: string;
  title: string;
  price: number;
  location: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  distance: string;
  elevation: string;
  image: string;
  maxParticipants: number;
  availableDates: string[];
}

export interface BookingFormData {
  trailId: string;
  date: string;
  participants: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingRecord {
  id: string;
  trailId: string;
  trailTitle: string;
  date: string;
  participants: number;
  name: string;
  email: string;
  phone: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
  totalPrice: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}
