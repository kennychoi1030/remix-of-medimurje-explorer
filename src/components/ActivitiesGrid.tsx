import { useInView } from "@/hooks/use-in-view";
import cyclingImg from "@/assets/cycling-section.jpg";
import wineImg from "@/assets/wine-section.jpg";
import gastroImg from "@/assets/gastro-section.jpg";

const activities = [
  {
    image: cyclingImg,
    title: "Cycling Routes",
    description: "Explore 600+ km of scenic cycling trails through vineyards and along rivers.",
  },
  {
    image: wineImg,
    title: "Wine Tasting",
    description: "Discover award-winning wines from the renowned Međimurje wine region.",
  },
  {
    image: gastroImg,
    title: "Gastronomy",
    description: "Savor authentic local cuisine rooted in centuries of culinary tradition.",
  },
];

const ActivitiesGrid = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="activities" className="py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <p className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}>
            Things to Do
          </p>
          <h2 className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}>
            Unforgettable Experiences
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, i) => (
            <ActivityCard key={activity.title} {...activity} delay={i * 0.15} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

function ActivityCard({ image, title, description, delay, isInView }: {
  image: string; title: string; description: string; delay: number; isInView: boolean;
}) {
  return (
    <div
      className={`group cursor-pointer ${isInView ? "animate-fade-in" : "opacity-0"}`}
      style={{ animationDelay: `${0.3 + delay}s` }}
    >
      <div className="overflow-hidden rounded-lg mb-5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground font-light leading-relaxed">{description}</p>
    </div>
  );
}

export default ActivitiesGrid;
