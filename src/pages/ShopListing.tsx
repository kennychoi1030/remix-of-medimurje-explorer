import { useState, useEffect, useMemo, useCallback } from "react";
import { ShoppingBag, Search, X, Plus, Pencil, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { products as staticProducts, ProductData } from "@/data/products";
import { initProductStore, getProductStore, createProduct, updateProduct, deleteProduct, restoreProduct } from "@/services/product-api";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductFormDialog from "@/components/ProductFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { localize, type Lang } from "@/types/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const badges = ["Best Seller", "New", "Sale"];

const ShopListing = () => {
  const { isAdmin } = useAdmin();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "zh" ? "zh" : "en") as Lang;
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [search, setSearch] = useState("");
  const [badgeFilter, setBadgeFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductData | null>(null);

  useEffect(() => {
    initProductStore(staticProducts);
    setProductList(getProductStore());
  }, []);

  const refresh = () => setProductList([...getProductStore()]);
  const featuredCount = useMemo(() => productList.filter((p) => p.isFeatured).length, [productList]);

  const filtered = useMemo(() => {
    let results = productList;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((p) => localize(p.title, lang).toLowerCase().includes(q) || localize(p.description, lang).toLowerCase().includes(q));
    }
    if (badgeFilter) results = results.filter((p) => p.badge === badgeFilter);
    return results;
  }, [productList, search, badgeFilter, lang]);

  const resetFilters = () => { setSearch(""); setBadgeFilter(""); };

  const handleCreate = async (data: Omit<ProductData, "id" | "created_at">) => {
    await createProduct(data);
    refresh();
    toast.success(lang === "zh" ? "商品建立成功！" : "Product created successfully!");
  };

  const handleUpdate = async (data: Omit<ProductData, "id" | "created_at">) => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, data);
    refresh();
    toast.success(lang === "zh" ? "商品更新成功！" : "Product updated successfully!");
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    await deleteProduct(removed.id);
    refresh();
    setDeleteTarget(null);
    toast.success(`"${localize(removed.title, lang)}" deleted`, {
      action: {
        label: "Undo",
        onClick: async () => { await restoreProduct(removed); refresh(); toast.info("Product restored!"); },
      },
    });
  }, [deleteTarget, lang]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">{t("shop.allProducts")}</h1>
        <p className="text-muted-foreground text-lg mb-10">{t("shop.browseDesc")}</p>

        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => { setEditingProduct(null); setFormOpen(true); }} className="gap-2">
              <Plus size={16} /> {t("shop.createNew")}
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("shop.searchPlaceholder")} className="pl-9" />
          </div>
          <select value={badgeFilter} onChange={(e) => setBadgeFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">{t("shop.allCategories")}</option>
            {badges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {(search || badgeFilter) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1"><X size={14} /> {t("common.reset")}</Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-4">{t("shop.noResults")}</p>
            <Button variant="outline" onClick={resetFilters}>{t("trails.resetFilters")}</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <Link to={`/product/${product.slug}`} className="relative overflow-hidden">
                  <img src={product.image} alt={localize(product.title, lang)} loading="lazy" width={800} height={600} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold ${product.badge === "Sale" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
                      {product.badge}
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{localize(product.title, lang)}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-sm line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-4">{localize(product.description, lang)}</p>
                  <button className="w-full flex items-center justify-center gap-2 h-9 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                    <ShoppingBag size={14} /> {t("shop.addToCart")}
                  </button>
                </div>

                {isAdmin && product.isFeatured && (
                  <Badge className="absolute top-12 left-3 bg-amber-500 text-white border-amber-500 gap-1">
                    <Star size={12} /> {t("admin.featured")}
                  </Badge>
                )}

                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProduct(product); setFormOpen(true); }} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(product)} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      <ProductFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingProduct(null); }}
        product={editingProduct}
        onSubmit={editingProduct ? handleUpdate : handleCreate}
        featuredCount={featuredCount}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemTitle={deleteTarget ? localize(deleteTarget.title, lang) : ""}
        itemType="Product"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ShopListing;
