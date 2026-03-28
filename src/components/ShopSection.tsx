import { useInView } from "@/hooks/use-in-view";
import { ShoppingBag } from "lucide-react";
import gearImg from "@/assets/hk-product-gear.jpg";
import bootsImg from "@/assets/hk-product-boots.jpg";

const products = [
  {
    image: gearImg,
    title: "Trail Explorer Pack",
    price: "HK$890",
    originalPrice: "HK$1,200",
    description: "30L hiking backpack with hydration system, trekking poles, and emergency kit.",
    badge: "Best Seller",
  },
  {
    image: bootsImg,
    title: "Summit Pro Hiking Boots",
    price: "HK$1,280",
    description: "Waterproof mid-cut boots with Vibram sole. Perfect for Hong Kong's rocky trails.",
    badge: null,
  },
  {
    image: gearImg,
    title: "Day Hike Essentials Kit",
    price: "HK$450",
    description: "First aid kit, headlamp, water purifier, and trail snacks — everything for a day out.",
    badge: "New",
  },
  {
    image: bootsImg,
    title: "Trail Runner Shoes",
    price: "HK$780",
    originalPrice: "HK$980",
    description: "Lightweight trail running shoes with excellent grip for fast-paced hikes.",
    badge: "Sale",
  },
];

const ShopSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="shop" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <p className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}>
            Gear Shop
          </p>
          <h2 className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}>
            Equip Your Adventure
          </h2>
          <p className={`mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light ${isInView ? "animate-fade-in" : "opacity-0"}`}
             style={{ animationDelay: "0.3s" }}>
            Premium hiking gear and apparel, selected by our trail experts for Hong Kong's unique terrain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
      </div>
    </section>
  );
};

export default ShopSection;
