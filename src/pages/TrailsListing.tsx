import { useState, useEffect, useMemo, useCallback } from "react";
import { MapPin, Clock, TrendingUp, Search, X, SlidersHorizontal, Mountain, Plus, Pencil, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trails as staticTrails, TrailData } from "@/data/trails";
import { initTrailStore, getTrailStore, createTrail, updateTrail, deleteTrail, restoreTrail } from "@/services/trail-api";
import { useAdmin } from "@/context/AdminContext";
import TrailFormDialog from "@/components/TrailFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DIFFICULTIES: TrailData["difficulty"][] = ["Easy", "Moderate", "Hard"];

const TrailsListing = () => {
  const { isAdmin } = useAdmin();
  const [trailList, setTrailList] = useState<TrailData[]>([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTrail, setEditingTrail] = useState<TrailData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TrailData | null>(null);

  useEffect(() => {
    initTrailStore(staticTrails);
    setTrailList(getTrailStore());
  }, []);

  const refresh = () => setTrailList([...getTrailStore()]);

  const locations = useMemo(() => [...new Set(trailList.map((t) => t.location))], [trailList]);
  const durations = useMemo(() => [...new Set(trailList.map((t) => t.duration))], [trailList]);
  const featuredCount = useMemo(() => trailList.filter((t) => t.isFeatured).length, [trailList]);

  const filtered = useMemo(() => {
    let results = trailList;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    if (difficulty) results = results.filter((t) => t.difficulty === difficulty);
    if (location) results = results.filter((t) => t.location === location);
    if (duration) results = results.filter((t) => t.duration === duration);
    return results;
  }, [trailList, search, difficulty, location, duration]);

  const hasFilters = search || difficulty || location || duration;
  const resetFilters = () => { setSearch(""); setDifficulty(""); setLocation(""); setDuration(""); };

  const handleCreate = async (data: Omit<TrailData, "slug">) => {
    await createTrail(data);
    refresh();
    toast.success("Trail created successfully!");
  };

  const handleUpdate = async (data: Omit<TrailData, "slug">) => {
    if (!editingTrail) return;
    await updateTrail(editingTrail.slug, data);
    refresh();
    toast.success("Trail updated successfully!");
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    await deleteTrail(removed.slug);
    refresh();
    setDeleteTarget(null);
    toast.success(`"${removed.title}" deleted`, {
      action: {
        label: "Undo",
        onClick: async () => { await restoreTrail(removed); refresh(); toast.info("Trail restored!"); },
      },
    });
  }, [deleteTarget]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-4 animate-fade-in">All Trails</p>
            <h1 className="section-title text-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>Explore Every Trail</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Browse, filter, and find the perfect hike for your next adventure.
            </p>
          </div>

          {/* Admin: Create button */}
          {isAdmin && (
            <div className="flex justify-end mb-6">
              <Button onClick={() => { setEditingTrail(null); setFormOpen(true); }} className="gap-2">
                <Plus size={16} /> Create New Trail
              </Button>
            </div>
          )}

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal size={16} /> Filters
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative lg:col-span-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search trails..." className="pl-9" />
              </div>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">All Difficulties</option>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">All Locations</option>
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">All Durations</option>
                {durations.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {hasFilters && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{filtered.length} trail{filtered.length !== 1 ? "s" : ""} found</span>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-sm"><X size={14} /> Reset Filters</Button>
              </div>
            )}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((trail) => (
                <div key={trail.slug} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/trail/${trail.slug}`}>
                    <div className="overflow-hidden">
                      <img src={trail.image} alt={trail.title} loading="lazy" width={800} height={600} className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{trail.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {trail.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {trail.duration}</span>
                        <span className="flex items-center gap-1"><TrendingUp size={14} /> {trail.difficulty}</span>
                      </div>
                      <p className="text-muted-foreground font-light leading-relaxed text-sm">{trail.description}</p>
                    </div>
                  </Link>

                  {/* Admin: Featured badge */}
                  {isAdmin && trail.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-amber-500 gap-1">
                      <Star size={12} /> Homepage Featured
                    </Badge>
                  )}

                  {/* Admin action buttons */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.preventDefault(); setEditingTrail(trail); setFormOpen(true); }} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={(e) => { e.preventDefault(); setDeleteTarget(trail); }} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Mountain size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">No trails found</h3>
              <p className="text-muted-foreground max-w-md mb-6">We couldn't find any trails matching your filters. Try adjusting your search criteria or reset all filters.</p>
              <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
            </div>
          )}
        </div>
      </section>
      <Footer />

      {/* Dialogs */}
      <TrailFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingTrail(null); }}
        trail={editingTrail}
        onSubmit={editingTrail ? handleUpdate : handleCreate}
        featuredCount={featuredCount}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemTitle={deleteTarget?.title ?? ""}
        itemType="Trail"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TrailsListing;
