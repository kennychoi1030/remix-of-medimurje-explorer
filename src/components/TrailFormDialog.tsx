import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ImageIcon } from "lucide-react";
import type { TrailData } from "@/data/trails";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trail?: TrailData | null;
  onSubmit: (data: Omit<TrailData, "slug">) => Promise<void>;
  featuredCount?: number;
}

const emptyForm = {
  title: "",
  location: "",
  duration: "",
  difficulty: "Moderate" as TrailData["difficulty"],
  distance: "",
  elevation: "",
  bestSeason: "",
  description: "",
  longDescription: "",
  image: "",
  highlights: [] as string[],
  gallery: [] as string[],
  elevationProfile: [] as TrailData["elevationProfile"],
  routeSteps: [] as TrailData["routeSteps"],
  isFeatured: false,
};

const TrailFormDialog = ({ open, onOpenChange, trail, onSubmit, featuredCount = 0 }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const isEdit = !!trail;

  useEffect(() => {
    if (trail) {
      setForm({
        title: trail.title,
        location: trail.location,
        duration: trail.duration,
        difficulty: trail.difficulty,
        distance: trail.distance,
        elevation: trail.elevation,
        bestSeason: trail.bestSeason,
        description: trail.description,
        longDescription: trail.longDescription,
        image: trail.image,
        highlights: trail.highlights,
        gallery: trail.gallery,
        elevationProfile: trail.elevationProfile,
        routeSteps: trail.routeSteps,
        isFeatured: trail.isFeatured,
      });
    } else {
      setForm(emptyForm);
    }
  }, [trail, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? "Edit Trail" : "Create New Trail"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Title *</label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Location *</label>
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Difficulty *</label>
              <select
                value={form.difficulty}
                onChange={(e) => set("difficulty", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Duration *</label>
              <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 3 hours" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Distance *</label>
              <Input value={form.distance} onChange={(e) => set("distance", e.target.value)} placeholder="e.g. 7.5 km" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Elevation</label>
              <Input value={form.elevation} onChange={(e) => set("elevation", e.target.value)} placeholder="e.g. 320 m" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Best Season</label>
              <Input value={form.bestSeason} onChange={(e) => set("bestSeason", e.target.value)} placeholder="e.g. Oct – Mar" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              required
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Long Description</label>
            <textarea
              value={form.longDescription}
              onChange={(e) => set("longDescription", e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Image URL with preview */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Image URL</label>
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://example.com/image.jpg" />
            {form.image && (
              <div className="mt-2 relative rounded-md overflow-hidden border border-border h-32 bg-muted flex items-center justify-center">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ImageIcon size={24} className="text-muted-foreground opacity-30" />
                </div>
              </div>
            )}
          </div>

          {/* Featured toggle */}
          <div className="rounded-md border border-border p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Display on Homepage (精選)</label>
              <Switch checked={form.isFeatured} onCheckedChange={(v) => setForm((f) => ({ ...f, isFeatured: v }))} />
            </div>
            <p className="text-xs text-muted-foreground">目前已選擇 {featuredCount} 個首頁精選項目（建議：3-6 個）</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Trail" : "Create Trail"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrailFormDialog;
