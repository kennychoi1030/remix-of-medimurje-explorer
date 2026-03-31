import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useTranslation } from "react-i18next";
import type { EventData } from "@/data/events";
import type { Localizable } from "@/types/i18n";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: EventData | null;
  onSubmit: (data: Omit<EventData, "id" | "created_at">) => Promise<void>;
  featuredCount?: number;
}

const emptyLocalizable: Localizable = { en: "", zh: "" };

const emptyForm = {
  title: { ...emptyLocalizable },
  date: "",
  location: "",
  spots: "",
  price: "",
  description: { ...emptyLocalizable },
  image: "",
  isFeatured: false,
};

const EventFormDialog = ({ open, onOpenChange, event, onSubmit, featuredCount = 0 }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const { t } = useTranslation();
  const isEdit = !!event;

  useEffect(() => {
    if (event) {
      setForm({
        title: { ...event.title },
        date: event.date,
        location: event.location,
        spots: event.spots,
        price: event.price,
        description: { ...event.description },
        image: event.image,
        isFeatured: event.isFeatured,
      });
      setImagePreview(event.image);
      setImageBlob(null);
    } else {
      setForm({ ...emptyForm, title: { ...emptyLocalizable }, description: { ...emptyLocalizable } });
      setImagePreview("");
      setImageBlob(null);
    }
  }, [event, open]);

  const handleImageChange = useCallback((blob: Blob | null, previewUrl: string) => {
    setImageBlob(blob);
    setImagePreview(previewUrl);
    setForm((f) => ({ ...f, image: previewUrl }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Connect to Laravel API - Build FormData for multipart upload
      // const formData = new FormData();
      // formData.append('title', JSON.stringify(form.title));
      // if (imageBlob) formData.append('image', imageBlob, 'image.jpg');
      await onSubmit(form);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const setLocalized = (key: "title" | "description", lang: "en" | "zh", value: string) =>
    setForm((f) => ({ ...f, [key]: { ...f[key], [lang]: value } }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? t("admin.editEvent") : t("admin.createEvent")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="en">
            <TabsList className="w-full">
              <TabsTrigger value="en" className="flex-1">English</TabsTrigger>
              <TabsTrigger value="zh" className="flex-1">繁體中文</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="space-y-3 mt-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title (EN) *</label>
                <Input value={form.title.en} onChange={(e) => setLocalized("title", "en", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description (EN) *</label>
                <textarea value={form.description.en} onChange={(e) => setLocalized("description", "en", e.target.value)} rows={3} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </TabsContent>
            <TabsContent value="zh" className="space-y-3 mt-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">標題 (ZH) *</label>
                <Input value={form.title.zh} onChange={(e) => setLocalized("title", "zh", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">描述 (ZH) *</label>
                <textarea value={form.description.zh} onChange={(e) => setLocalized("description", "zh", e.target.value)} rows={3} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
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

          <ImageUpload preview={imagePreview} onChange={handleImageChange} />

          <div className="rounded-md border border-border p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">{t("admin.featuredToggle")}</label>
              <Switch checked={form.isFeatured} onCheckedChange={(v) => setForm((f) => ({ ...f, isFeatured: v }))} />
            </div>
            <p className="text-xs text-muted-foreground">{t("admin.featuredCount", { count: featuredCount })}</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>{t("admin.cancel")}</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? t("admin.updateBtn") : t("admin.createBtn")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
