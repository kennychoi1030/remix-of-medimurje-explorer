import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localize, type Lang } from "@/types/i18n";
import {
  products as staticProducts,
  ProductData,
  type FootwearSpecs,
  type BagSpecs,
  type GearSpecs,
} from "@/data/products";
import { initProductStore, getProductStore } from "@/services/product-api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShoppingBag, Minus, Plus, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "zh" ? "zh" : "en") as Lang;

  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    initProductStore(staticProducts);
    setAllProducts(getProductStore());
  }, []);

  const product = useMemo(
    () => allProducts.find((p) => p.slug === slug),
    [allProducts, slug]
  );

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 6);
  }, [allProducts, product]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize(null);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 text-center max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-display text-foreground mb-4">
            {t("product.notFound")}
          </h1>
          <Link to="/shop">
            <Button variant="outline">{t("product.backToShop")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image];
  const isFootwear = product.category === "footwear";
  const isBag = product.category === "bags";
  const isGear = product.category === "gear";

  const handleAddToCart = () => {
    if (isFootwear && !selectedSize) {
      toast.error(
        lang === "zh" ? "請先選擇尺碼" : "Please select a size first"
      );
      return;
    }
    toast.success(
      lang === "zh"
        ? `已將 ${quantity} 件「${localize(product.title, lang)}」加入購物車`
        : `Added ${quantity}× "${localize(product.title, lang)}" to cart`
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          {t("product.backToShop")}
        </Link>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Gallery */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={images[selectedImage]}
                alt={localize(product.title, lang)}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span
                  className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 rounded text-xs font-semibold",
                    product.badge === "Sale"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {product.badge}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              {localize(product.title, lang)}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-primary">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {localize(product.description, lang)}
            </p>

            {/* Dynamic Specs Selector */}
            {isFootwear && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {t("product.size")}
                  {" — "}
                  <span className="font-normal text-muted-foreground">
                    {localize(
                      (product.specs as FootwearSpecs).gender,
                      lang
                    )}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(product.specs as FootwearSpecs).sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-10 min-w-[3rem] px-3 rounded-md border text-sm font-medium transition-colors",
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("product.material")}:{" "}
                  {localize(
                    (product.specs as FootwearSpecs).material,
                    lang
                  )}
                </p>
              </div>
            )}

            {isBag && (
              <div className="mb-8 space-y-2">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {t("product.specifications")}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted rounded-md p-3">
                    <span className="text-muted-foreground block text-xs mb-1">
                      {t("product.capacity")}
                    </span>
                    <span className="font-medium text-foreground">
                      {(product.specs as BagSpecs).capacity}
                    </span>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <span className="text-muted-foreground block text-xs mb-1">
                      {t("product.weight")}
                    </span>
                    <span className="font-medium text-foreground">
                      {(product.specs as BagSpecs).weight}
                    </span>
                  </div>
                  <div className="bg-muted rounded-md p-3 col-span-2">
                    <span className="text-muted-foreground block text-xs mb-1">
                      {t("product.dimensions")}
                    </span>
                    <span className="font-medium text-foreground">
                      {localize(
                        (product.specs as BagSpecs).dimensions,
                        lang
                      )}
                    </span>
                  </div>
                  <div className="bg-muted rounded-md p-3 col-span-2">
                    <span className="text-muted-foreground block text-xs mb-1">
                      {t("product.material")}
                    </span>
                    <span className="font-medium text-foreground">
                      {localize(
                        (product.specs as BagSpecs).material,
                        lang
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isGear && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {t("product.includes")}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(product.specs as GearSpecs).includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {localize(item, lang)}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("product.totalWeight")}: {(product.specs as GearSpecs).weight}
                </p>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-input rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="h-10 w-12 flex items-center justify-center text-sm font-medium text-foreground border-x border-input">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                {t("shop.addToCart")}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">
                {t("product.descriptionTab")}
              </TabsTrigger>
              <TabsTrigger value="specs">
                {t("product.specifications")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-foreground leading-relaxed max-w-3xl">
                {localize(product.description, lang)}
              </p>
            </TabsContent>
            <TabsContent value="specs" className="pt-6">
              <div className="max-w-2xl">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground font-medium pr-6">
                        {t("product.categoryLabel")}
                      </td>
                      <td className="py-3 text-foreground capitalize">
                        {product.category}
                      </td>
                    </tr>
                    {isFootwear && (
                      <>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.gender")}
                          </td>
                          <td className="py-3 text-foreground">
                            {localize((product.specs as FootwearSpecs).gender, lang)}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.availableSizes")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as FootwearSpecs).sizes.join(", ")}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.material")}
                          </td>
                          <td className="py-3 text-foreground">
                            {localize((product.specs as FootwearSpecs).material, lang)}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.waterproof")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as FootwearSpecs).waterproof
                              ? "✓ Yes"
                              : "✗ No"}
                          </td>
                        </tr>
                      </>
                    )}
                    {isBag && (
                      <>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.capacity")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as BagSpecs).capacity}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.dimensions")}
                          </td>
                          <td className="py-3 text-foreground">
                            {localize((product.specs as BagSpecs).dimensions, lang)}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.weight")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as BagSpecs).weight}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.material")}
                          </td>
                          <td className="py-3 text-foreground">
                            {localize((product.specs as BagSpecs).material, lang)}
                          </td>
                        </tr>
                      </>
                    )}
                    {isGear && (
                      <>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.includes")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as GearSpecs).includes
                              .map((item) => localize(item, lang))
                              .join(", ")}
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 text-muted-foreground font-medium pr-6">
                            {t("product.totalWeight")}
                          </td>
                          <td className="py-3 text-foreground">
                            {(product.specs as GearSpecs).weight}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
              {t("product.relatedProducts")}
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/product/${rp.slug}`}
                  className="shrink-0 w-64 group"
                >
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={rp.image}
                      alt={localize(rp.title, lang)}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {rp.badge && (
                      <span
                        className={cn(
                          "absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold",
                          rp.badge === "Sale"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary text-primary-foreground"
                        )}
                      >
                        {rp.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {localize(rp.title, lang)}
                  </h3>
                  <span className="text-primary text-sm font-bold">
                    {rp.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
