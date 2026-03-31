/**
 * Event CRUD Mock API
 * All functions simulate network delay and are structured to be replaced
 * by real Laravel API calls via axios/fetch.
 */

import { EventData } from "@/data/events";

const SIMULATED_DELAY = 1000;
const delay = (ms = SIMULATED_DELAY) => new Promise((r) => setTimeout(r, ms));

let eventStore: EventData[] = [];

export const initEventStore = (events: EventData[]) => {
  eventStore = [...events];
};
export const getEventStore = () => eventStore;

/** POST /api/events */
export async function createEvent(data: Omit<EventData, "id" | "created_at">): Promise<EventData> {
  // TODO: Connect to Laravel API — POST /api/events
  // TODO: Connect to Laravel API - Send as Multipart/Form-Data. See Laravel Controller Request validation.
  // TODO: Laravel backend should handle this featured flag
  await delay();
  const event: EventData = {
    ...data,
    id: `evt-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  eventStore = [event, ...eventStore];
  return event;
}

/** PUT /api/events/:id */
export async function updateEvent(id: string, data: Partial<EventData>): Promise<EventData> {
  // TODO: Connect to Laravel API — PUT /api/events/${id}
  // TODO: Connect to Laravel API - Send as Multipart/Form-Data. See Laravel Controller Request validation.
  // TODO: Laravel backend should handle this featured flag
  await delay();
  eventStore = eventStore.map((e) => (e.id === id ? { ...e, ...data } : e));
  return eventStore.find((e) => e.id === id)!;
}

/** DELETE /api/events/:id (Laravel Soft Delete) */
export async function deleteEvent(id: string): Promise<void> {
  // TODO: Connect to Laravel API — DELETE /api/events/${id}
  await delay();
  eventStore = eventStore.filter((e) => e.id !== id);
}

/** POST /api/events/:id/restore */
export async function restoreEvent(event: EventData): Promise<void> {
  // TODO: Connect to Laravel API — POST /api/events/${event.id}/restore
  await delay();
  eventStore = [event, ...eventStore];
}
