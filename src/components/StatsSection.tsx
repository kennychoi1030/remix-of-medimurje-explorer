import { useInView } from "@/hooks/use-in-view";
import { useTranslation } from "react-i18next";

const StatsSection = () => {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  const stats = [
    { value: "200+", label: t("stats.trails") },
    { value: "24", label: t("stats.parks") },
    { value: "5,000+", label: t("stats.hikers") },
    { value: "100+", label: t("stats.events") },
  ];

  return (
    <section className="py-20 bg-foreground text-background">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-display text-4xl md:text-5xl font-semibold mb-2">{stat.value}</p>
              <p className="text-background/60 uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
