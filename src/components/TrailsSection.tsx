import { useInView } from "@/hooks/use-in-view";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { trails } from "@/data/trails";

const TrailsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="trails" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <p className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}>
            Featured Trails
          </p>
          <h2 className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}>
            Iconic Hong Kong Hikes
          </h2>
          <p className={`mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light ${isInView ? "animate-fade-in" : "opacity-0"}`}
             style={{ animationDelay: "0.3s" }}>
            From coastal cliff walks to misty mountain ridges, Hong Kong offers some of the most dramatic hiking in Asia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trails.map((trail, i) => (
            <Link
              key={trail.slug}
              to={`/trail/${trail.slug}`}
              className={`group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="overflow-hidden">
                <img
                  src={trail.image}
                  alt={trail.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{trail.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {trail.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {trail.duration}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={14} /> {trail.difficulty}</span>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{trail.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailsSection;
