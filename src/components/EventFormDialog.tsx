import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ImageIcon } from "lucide-react";
import type { EventData } from "@/data/events";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: EventData | null;
  onSubmit: (data: Omit<EventData, "id" | "created_at">) => Promise<void>;
  featuredCount?: number;
}

const emptyForm = {
  title: "",
  date: "",
  location: "",
  spots: "",
  price: "",
  description: "",
  image: "",
  isFeatured: false,
};

const EventFormDialog = ({ open, onOpenChange, event, onSubmit, featuredCount = 0 }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const isEdit = !!event;

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        date: event.date,
        location: event.location,
        spots: event.spots,
        price: event.price,
        description: event.description,
        image: event.image,
        isFeatured: event.isFeatured,
      });
    } else {
      setForm(emptyForm);
    }
  }, [event, open]);

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
            {isEdit ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Title *</label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Date *</label>
              <Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. April 12, 2026" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Location *</label>
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price *</label>
              <Input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. HK$280" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Spots</label>
              <Input value={form.spots} onChange={(e) => set("spots", e.target.value)} placeholder="e.g. 20 spots left" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              required
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Image URL</label>
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://example.com/image.jpg" />
            {form.image && (
              <div className="mt-2 relative rounded-md overflow-hidden border border-border h-32 bg-muted flex items-center justify-center">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
