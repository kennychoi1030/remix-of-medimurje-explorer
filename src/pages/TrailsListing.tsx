import { useState, useEffect, useMemo } from "react";
import { MapPin, Clock, TrendingUp, Search, X, SlidersHorizontal, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trails as staticTrails, TrailData } from "@/data/trails";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DIFFICULTIES: TrailData["difficulty"][] = ["Easy", "Moderate", "Hard"];

const TrailsListing = () => {
  const [allTrails] = useState<TrailData[]>(staticTrails);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  // TODO: Replace with fetchTrails() from trail-api.ts when connecting to Laravel
  // const [page, setPage] = useState(1); // reserved for backend pagination

  const locations = useMemo(
    () => [...new Set(allTrails.map((t) => t.location))],
    [allTrails]
  );

  const durations = useMemo(
    () => [...new Set(allTrails.map((t) => t.duration))],
    [allTrails]
  );

  const filtered = useMemo(() => {
    let results = allTrails;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    if (difficulty) results = results.filter((t) => t.difficulty === difficulty);
    if (location) results = results.filter((t) => t.location === location);
    if (duration) results = results.filter((t) => t.duration === duration);
    return results;
  }, [allTrails, search, difficulty, location, duration]);

  const hasFilters = search || difficulty || location || duration;

  const resetFilters = () => {
    setSearch("");
    setDifficulty("");
    setLocation("");
    setDuration("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-subtitle mb-4 animate-fade-in">All Trails</p>
            <h1 className="section-title text-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Explore Every Trail
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Browse, filter, and find the perfect hike for your next adventure.
            </p>
          </div>

          {/* Filters bar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal size={16} />
              Filters
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trails..."
                  className="pl-9"
                />
              </div>

              {/* Difficulty */}
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">All Difficulties</option>
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Location */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">All Locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Duration */}
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">All Durations</option>
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {hasFilters && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{filtered.length} trail{filtered.length !== 1 ? "s" : ""} found</span>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-sm">
                  <X size={14} /> Reset Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((trail) => (
                <Link
                  key={trail.slug}
                  to={`/trail/${trail.slug}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={trail.image}
                      alt={trail.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">
                      {trail.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {trail.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {trail.duration}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={14} /> {trail.difficulty}</span>
                    </div>
                    <p className="text-muted-foreground font-light leading-relaxed text-sm">
                      {trail.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Mountain size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                No trails found
              </h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any trails matching your filters. Try adjusting your search criteria or reset all filters.
              </p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrailsListing;
