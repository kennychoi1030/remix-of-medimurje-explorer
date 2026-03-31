/**
 * Trail CRUD Mock API
 * All functions simulate network delay and are structured to be replaced
 * by real Laravel API calls via axios/fetch.
 */

import { TrailData } from "@/data/trails";

const SIMULATED_DELAY = 1000;

const delay = (ms = SIMULATED_DELAY) => new Promise((r) => setTimeout(r, ms));

// ---- In-memory store (initialised from static data) ----
let trailStore: TrailData[] = [];

export const initTrailStore = (trails: TrailData[]) => {
  trailStore = [...trails];
};

export const getTrailStore = () => trailStore;

// ---- CRUD Operations ----

/** GET /api/trails?page=&filter= */
export async function fetchTrails(_params?: {
  page?: number;
  difficulty?: string;
  location?: string;
  duration?: string;
  search?: string;
}): Promise<TrailData[]> {
  // TODO: Connect to Laravel API — GET /api/trails
  await delay();
  let results = [...trailStore];

  if (_params?.difficulty) {
    results = results.filter((t) => t.difficulty === _params.difficulty);
  }
  if (_params?.location) {
    results = results.filter((t) => t.location.includes(_params.location!));
  }
  if (_params?.duration) {
    results = results.filter((t) => t.duration.includes(_params.duration!));
  }
  if (_params?.search) {
    const q = _params.search.toLowerCase();
    results = results.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }
  return results;
}

/** POST /api/trails */
export async function createTrail(data: Omit<TrailData, "slug">): Promise<TrailData> {
  // TODO: Connect to Laravel API — POST /api/trails
  // TODO: Connect to Laravel API - Send as Multipart/Form-Data. See Laravel Controller Request validation.
  // TODO: Laravel backend should handle this featured flag
  await delay();
  const trail: TrailData = {
    ...data,
    slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  };
  trailStore = [trail, ...trailStore];
  return trail;
}

/** PUT /api/trails/:slug */
export async function updateTrail(slug: string, data: Partial<TrailData>): Promise<TrailData> {
  // TODO: Connect to Laravel API — PUT /api/trails/${slug}
  // TODO: Laravel backend should handle this featured flag
  await delay();
  trailStore = trailStore.map((t) => (t.slug === slug ? { ...t, ...data } : t));
  return trailStore.find((t) => t.slug === slug)!;
}

/** DELETE /api/trails/:slug  (Laravel Soft Delete — front-end removes from list) */
export async function deleteTrail(slug: string): Promise<void> {
  // TODO: Connect to Laravel API — DELETE /api/trails/${slug}
  await delay();
  trailStore = trailStore.filter((t) => t.slug !== slug);
}

/** POST /api/trails/:slug/restore  (Laravel Soft Delete restore) */
export async function restoreTrail(trail: TrailData): Promise<void> {
  // TODO: Connect to Laravel API — POST /api/trails/${trail.slug}/restore
  await delay();
  trailStore = [trail, ...trailStore];
}
