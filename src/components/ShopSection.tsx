import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ShoppingBag, Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { products as staticProducts, ProductData } from "@/data/products";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import ProductFormDialog from "@/components/ProductFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EditableText from "@/components/EditableText";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { localize, type Lang } from "@/types/i18n";
import {
  initProductStore,
  getProductStore,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} from "@/services/product-api";

const ShopSection = () => {
  const { ref, isInView } = useInView();
  const { isAdmin } = useAdmin();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "zh" ? "zh" : "en") as Lang;

  const [productList, setProductList] = useState<ProductData[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductData | null>(null);

  const [sectionTitle, setSectionTitle] = useState(t("shop.title"));
  const [sectionSubtitle, setSectionSubtitle] = useState(t("shop.subtitle"));
  const [sectionDesc, setSectionDesc] = useState(t("shop.description"));

  useEffect(() => {
    setSectionTitle(t("shop.title"));
    setSectionSubtitle(t("shop.subtitle"));
    setSectionDesc(t("shop.description"));
  }, [i18n.language, t]);

  useEffect(() => {
    initProductStore(staticProducts);
    setProductList(getProductStore());
  }, []);

  const refresh = () => setProductList([...getProductStore()]);
  const featured = productList.filter((p) => p.isFeatured);
  const featuredCount = featured.length;

  const handleCreate = async (data: Omit<ProductData, "id" | "created_at">) => {
    await createProduct(data);
    refresh();
    toast.success(i18n.language === "zh" ? "商品建立成功！" : "Product created successfully!");
  };

  const handleUpdate = async (data: Omit<ProductData, "id" | "created_at">) => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, data);
    refresh();
    toast.success(i18n.language === "zh" ? "商品更新成功！" : "Product updated successfully!");
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
        onClick: async () => {
          await restoreProduct(removed);
          refresh();
          toast.info("Product restored!");
        },
      },
    });
  }, [deleteTarget, lang]);

  return (
    <section id="shop" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <EditableText
            value={sectionSubtitle}
            onChange={setSectionSubtitle}
            as="p"
            className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}
          />
          <EditableText
            value={sectionTitle}
            onChange={setSectionTitle}
            as="h2"
            className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          />
          <EditableText
            value={sectionDesc}
            onChange={setSectionDesc}
            as="p"
            className={`mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light ${isInView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
            multiline
          />
        </div>

        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => { setEditingProduct(null); setFormOpen(true); }} className="gap-2">
              <Plus size={16} />
              {t("shop.createNew")}
            </Button>
          </div>
        )}

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <div
                key={product.id}
                className={`group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={localize(product.title, lang)} loading="lazy" width={800} height={600} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold ${product.badge === "Sale" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
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
        ) : isAdmin ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">{t("shop.noFeatured")}</p>
            <Link to="/shop">
              <Button variant="outline">{t("shop.goToList")}</Button>
            </Link>
          </div>
        ) : null}

        <div className="flex justify-center mt-16">
          <Link to="/shop">
            <Button size="lg" variant="outline" className="px-12 py-6 text-base font-medium tracking-wide">
              {t("shop.browseAll")}
            </Button>
          </Link>
        </div>
      </div>

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
    </section>
  );
};

export default ShopSection;
