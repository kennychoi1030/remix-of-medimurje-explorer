import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useTranslation } from "react-i18next";
import { categorySchemas, categoryKeys, type SpecFieldDef } from "@/config/categorySchema";
import { toast } from "sonner";
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

interface CustomSpec {
  key: string;
  value: string;
}

const ProductFormDialog = ({ open, onOpenChange, product, onSubmit, featuredCount = 0 }: Props) => {
  const [title, setTitle] = useState<Localizable>({ ...emptyLocalizable });
  const [description, setDescription] = useState<Localizable>({ ...emptyLocalizable });
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [badge, setBadge] = useState<string | null>("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(categoryKeys[0]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [specs, setSpecs] = useState<Record<string, unknown>>({});
  const [customSpecs, setCustomSpecs] = useState<CustomSpec[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const { t } = useTranslation();
  const isEdit = !!product;

  // Reset form when product or open changes
  useEffect(() => {
    if (product) {
      setTitle({ ...product.title });
      setDescription({ ...product.description });
      setPrice(product.price);
      setOriginalPrice(product.originalPrice ?? "");
      setBadge(product.badge ?? "");
      setSlug(product.slug);
      // Map old categories to new schema keys
      const cat = product.category === "footwear" ? "shoes" : product.category === "gear" ? "clothes" : product.category;
      setCategory(categoryKeys.includes(cat) ? cat : categoryKeys[0]);
      setIsFeatured(product.isFeatured);

      // Separate schema specs from custom specs
      const schema = categorySchemas[cat] ?? categorySchemas[categoryKeys[0]];
      const schemaKeys = new Set(schema.fields.map((f) => f.key));
      const schemaSpecs: Record<string, unknown> = {};
      const custom: CustomSpec[] = [];
      if (product.specs && typeof product.specs === "object") {
        for (const [k, v] of Object.entries(product.specs)) {
          if (schemaKeys.has(k)) {
            schemaSpecs[k] = v;
          } else {
            custom.push({ key: k, value: typeof v === "object" ? JSON.stringify(v) : String(v) });
          }
        }
      }
      setSpecs(schemaSpecs);
      setCustomSpecs(custom);
      setImagePreview(product.image);
      setImageBlob(null);
    } else {
      setTitle({ ...emptyLocalizable });
      setDescription({ ...emptyLocalizable });
      setPrice("");
      setOriginalPrice("");
      setBadge("");
      setSlug("");
      setCategory(categoryKeys[0]);
      setIsFeatured(false);
      setSpecs({});
      setCustomSpecs([]);
      setImagePreview("");
      setImageBlob(null);
    }
  }, [product, open]);

  const handleImageChange = useCallback((blob: Blob | null, previewUrl: string) => {
    setImageBlob(blob);
    setImagePreview(previewUrl);
  }, []);

  const setSpecValue = (key: string, value: unknown) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  const addCustomSpec = () => setCustomSpecs((prev) => [...prev, { key: "", value: "" }]);
  const removeCustomSpec = (idx: number) => setCustomSpecs((prev) => prev.filter((_, i) => i !== idx));
  const updateCustomSpec = (idx: number, field: "key" | "value", val: string) =>
    setCustomSpecs((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));

  /** Translate a spec label — falls back to raw key */
  const specLabel = (labelKey: string, fallback: string) => {
    const translated = t(labelKey, { defaultValue: "__MISS__" });
    return translated === "__MISS__" ? fallback : translated;
  };

  /** Render a single spec field from schema definition */
  const renderSpecField = (field: SpecFieldDef) => {
    const label = specLabel(field.labelKey, field.key);
    const value = specs[field.key];

    switch (field.type) {
      case "text":
        return (
          <div key={field.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
            <Input
              value={(value as string) ?? ""}
              onChange={(e) => setSpecValue(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        );
      case "number":
        return (
          <div key={field.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
            <Input
              type="number"
              value={(value as number) ?? ""}
              onChange={(e) => setSpecValue(field.key, e.target.value ? Number(e.target.value) : "")}
              placeholder={field.placeholder}
            />
          </div>
        );
      case "select":
        return (
          <div key={field.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
            <Select value={(value as string) ?? ""} onValueChange={(v) => setSpecValue(field.key, v)}>
              <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "boolean":
        return (
          <div key={field.key} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <Switch checked={!!value} onCheckedChange={(v) => setSpecValue(field.key, v)} />
          </div>
        );
      case "sizes":
        return (
          <div key={field.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
            <Input
              value={Array.isArray(value) ? (value as (string | number)[]).join(", ") : (value as string) ?? ""}
              onChange={(e) => setSpecValue(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
            <p className="text-xs text-muted-foreground mt-1">{t("specs.sizesHint")}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Build final specs: merge schema specs + custom specs
      const finalSpecs: Record<string, unknown> = { ...specs };

      // Parse sizes field if it's a comma-separated string
      if (typeof finalSpecs.sizes === "string") {
        finalSpecs.sizes = (finalSpecs.sizes as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => (isNaN(Number(s)) ? s : Number(s)));
      }

      // Merge custom specs
      for (const cs of customSpecs) {
        if (cs.key.trim()) {
          finalSpecs[cs.key.trim()] = cs.value;
        }
      }

      const payload: Omit<ProductData, "id" | "created_at"> = {
        title,
        description,
        price,
        originalPrice: originalPrice || undefined,
        badge: badge || null,
        slug: slug || title.en.toLowerCase().replace(/\s+/g, "-"),
        image: imagePreview,
        images: [imagePreview].filter(Boolean),
        category: category as ProductData["category"],
        specs: finalSpecs as ProductData["specs"],
        isFeatured,
      };

      // Debug: log final payload
      console.log("[ProductFormDialog] Submitting payload:", JSON.stringify(payload, null, 2));

      // TODO: Connect to Laravel API — Build FormData for multipart upload
      // const formData = new FormData();
      // formData.append('title', JSON.stringify(payload.title));
      // formData.append('category', payload.category);
      // formData.append('specs', JSON.stringify(finalSpecs));
      // if (imageBlob) formData.append('image', imageBlob, 'image.jpg');

      await onSubmit(payload);
      toast.success(isEdit ? t("admin.updateBtn") + " ✓" : t("admin.createBtn") + " ✓");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const schema = categorySchemas[category];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? t("admin.editProduct") : t("admin.createProduct")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bilingual title / description */}
          <Tabs defaultValue="en">
            <TabsList className="w-full">
              <TabsTrigger value="en" className="flex-1">English</TabsTrigger>
              <TabsTrigger value="zh" className="flex-1">繁體中文</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="space-y-3 mt-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title (EN) *</label>
                <Input value={title.en} onChange={(e) => setTitle((p) => ({ ...p, en: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description (EN) *</label>
                <textarea value={description.en} onChange={(e) => setDescription((p) => ({ ...p, en: e.target.value }))} rows={3} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </TabsContent>
            <TabsContent value="zh" className="space-y-3 mt-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">標題 (ZH) *</label>
                <Input value={title.zh} onChange={(e) => setTitle((p) => ({ ...p, zh: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">描述 (ZH) *</label>
                <textarea value={description.zh} onChange={(e) => setDescription((p) => ({ ...p, zh: e.target.value }))} rows={3} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </TabsContent>
          </Tabs>

          {/* Price / Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price *</label>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. HK$890" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Original Price</label>
              <Input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="e.g. HK$1,200" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Badge</label>
              <Input value={badge ?? ""} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. Best Seller, Sale, New" />
            </div>
          </div>

          {/* Category selector */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{t("product.categoryLabel")} *</label>
            <Select value={category} onValueChange={(v) => { setCategory(v); setSpecs({}); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categoryKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {specLabel(categorySchemas[key].labelKey, categorySchemas[key].label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic specs from schema */}
          {schema && (
            <div className="rounded-md border border-border p-4 space-y-3">
              <h4 className="text-sm font-semibold text-foreground">{t("product.specifications")}</h4>
              {schema.fields.map(renderSpecField)}
            </div>
          )}

          {/* Custom specs */}
          <div className="rounded-md border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{t("specs.customSpecs")}</h4>
              <Button type="button" variant="outline" size="sm" onClick={addCustomSpec}>
                <Plus className="h-3.5 w-3.5 mr-1" /> {t("specs.addCustom")}
              </Button>
            </div>
            {customSpecs.map((cs, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={cs.key}
                  onChange={(e) => updateCustomSpec(idx, "key", e.target.value)}
                  placeholder="Key"
                  className="flex-1"
                />
                <Input
                  value={cs.value}
                  onChange={(e) => updateCustomSpec(idx, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeCustomSpec(idx)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {customSpecs.length === 0 && (
              <p className="text-xs text-muted-foreground">{t("specs.customHint")}</p>
            )}
          </div>

          {/* Image upload */}
          <ImageUpload preview={imagePreview} onChange={handleImageChange} />

          {/* Featured toggle */}
          <div className="rounded-md border border-border p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">{t("admin.featuredToggle")}</label>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
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
