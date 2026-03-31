import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import type { ProductData } from "@/data/products";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductData | null;
  onSubmit: (data: Omit<ProductData, "id" | "created_at">) => Promise<void>;
  featuredCount?: number;
}

const emptyForm = {
  title: "",
  price: "",
  originalPrice: "",
  description: "",
  badge: "" as string | null,
  image: "",
  isFeatured: false,
};

const ProductFormDialog = ({ open, onOpenChange, product, onSubmit, featuredCount = 0 }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const isEdit = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice ?? "",
        description: product.description,
        badge: product.badge ?? "",
        image: product.image,
        isFeatured: product.isFeatured,
      });
      setImagePreview(product.image);
      setImageBlob(null);
    } else {
      setForm(emptyForm);
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
      // Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));
      // if (imageBlob) formData.append('image', imageBlob, 'image.jpg');
      await onSubmit({
        ...form,
        originalPrice: form.originalPrice || undefined,
        badge: form.badge || null,
        isFeatured: form.isFeatured,
      });
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
            {isEdit ? "Edit Product" : "Create New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Title *</label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
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

          {/* Image upload with Canvas resize & preview */}
          <ImageUpload preview={imagePreview} onChange={handleImageChange} />

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
              {isEdit ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
