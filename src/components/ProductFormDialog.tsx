import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useTranslation } from "react-i18next";
import type { ProductData } from "@/data/products";
import type { Localizable } from "@/types/i18n";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductData | null;
  onSubmit: (data: Omit<ProductData, "id" | "created_at">) => Promise<void>;
  featuredCount?: number;
}

const emptyLocalizable: Localizable = { en: "", zh: "" };

const emptyForm = {
  title: { ...emptyLocalizable },
  price: "",
  originalPrice: "",
  description: { ...emptyLocalizable },
  badge: "" as string | null,
  image: "",
  images: [] as string[],
  slug: "",
  category: "gear" as "footwear" | "bags" | "gear",
  specs: {} as Record<string, unknown>,
  isFeatured: false,
};

const ProductFormDialog = ({ open, onOpenChange, product, onSubmit, featuredCount = 0 }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const { t } = useTranslation();
  const isEdit = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        title: { ...product.title },
        price: product.price,
        originalPrice: product.originalPrice ?? "",
        description: { ...product.description },
        badge: product.badge ?? "",
        image: product.image,
        images: [...product.images],
        slug: product.slug,
        category: product.category,
        specs: product.specs as Record<string, unknown>,
        isFeatured: product.isFeatured,
      });
      setImagePreview(product.image);
      setImageBlob(null);
    } else {
      setForm({ ...emptyForm, title: { ...emptyLocalizable }, description: { ...emptyLocalizable } });
      setImagePreview("");
      setImageBlob(null);
    }
  }, [product, open]);

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
      await onSubmit({
        ...form,
        originalPrice: form.originalPrice || undefined,
        badge: form.badge || null,
        isFeatured: form.isFeatured,
        slug: form.slug || form.title.en.toLowerCase().replace(/\s+/g, "-"),
        images: form.images.length > 0 ? form.images : [form.image].filter(Boolean),
        category: form.category,
        specs: form.specs,
      } as Omit<ProductData, "id" | "created_at">);
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
            {isEdit ? t("admin.editProduct") : t("admin.createProduct")}
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
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price *</label>
              <Input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. HK$890" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Original Price</label>
              <Input value={form.originalPrice ?? ""} onChange={(e) => set("originalPrice", e.target.value)} placeholder="e.g. HK$1,200" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Badge</label>
              <Input value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} placeholder="e.g. Best Seller, Sale, New" />
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

export default ProductFormDialog;
