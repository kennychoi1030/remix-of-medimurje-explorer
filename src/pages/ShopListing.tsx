import { useState, useEffect, useMemo } from "react";
import { ShoppingBag, Search, X } from "lucide-react";
import { products as staticProducts, ProductData } from "@/data/products";
import { initProductStore, getProductStore } from "@/services/product-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const badges = ["Best Seller", "New", "Sale"];

const ShopListing = () => {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [search, setSearch] = useState("");
  const [badgeFilter, setBadgeFilter] = useState("");

  useEffect(() => {
    initProductStore(staticProducts);
    setProductList(getProductStore());
  }, []);

  const filtered = useMemo(() => {
    let results = productList;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (badgeFilter) {
      results = results.filter((p) => p.badge === badgeFilter);
    }
    return results;
  }, [productList, search, badgeFilter]);

  const resetFilters = () => { setSearch(""); setBadgeFilter(""); };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground text-lg mb-10">Premium hiking gear selected for Hong Kong's unique terrain.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-9" />
          </div>
          <select value={badgeFilter} onChange={(e) => setBadgeFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All Categories</option>
            {badges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {(search || badgeFilter) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
              <X size={14} /> Reset
            </Button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.title} loading="lazy" width={800} height={600} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold ${
                      product.badge === "Sale" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-sm line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-4">{product.description}</p>
                  <button className="w-full flex items-center justify-center gap-2 h-9 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShopListing;
