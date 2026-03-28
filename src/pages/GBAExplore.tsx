import { useState } from "react";
import { ChevronLeft, MapPin, Compass, Landmark, Trees, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { gbaCities, type CategoryFilter } from "@/data/gba-cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const filters: { value: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All", icon: Compass },
  { value: "culture", label: "Culture", icon: Landmark },
  { value: "nature", label: "Nature", icon: Trees },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
];

const GBAExplore = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredCities = gbaCities.map((city) => ({
    ...city,
    filteredActivities:
      activeFilter === "all"
        ? city.activities
        : city.activities.filter((a) => a.category === activeFilter),
  })).filter((city) => city.filteredActivities.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Greater Bay Area
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            Explore the Bay
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Five extraordinary cities, one unforgettable region. Discover culture, nature, and world-class shopping across the Greater Bay Area.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-20 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={15} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* City Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-display text-2xl font-semibold text-primary-foreground">
                    {city.name}
                  </h2>
                  <p className="text-primary-foreground/70 text-sm">{city.nameZh}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground hover:bg-primary">
                  {city.filteredActivities.length} {activeFilter === "all" ? "activities" : activeFilter}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {city.description}
                </p>

                {/* Activity pills */}
                <div className="flex flex-wrap gap-2">
                  {city.filteredActivities.slice(0, 3).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:bg-primary/10 transition-colors cursor-default"
                    >
                      <MapPin size={12} className="text-primary" />
                      {activity.title}
                    </div>
                  ))}
                  {city.filteredActivities.length > 3 && (
                    <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      +{city.filteredActivities.length - 3} more
                    </span>
                  )}
                </div>

                <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Explore {city.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GBAExplore;
