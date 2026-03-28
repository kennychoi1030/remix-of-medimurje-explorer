import { useInView } from "@/hooks/use-in-view";

interface Props {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  cta?: string;
}

const FeatureSection = ({ subtitle, title, description, image, imageAlt, reversed, cta }: Props) => {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${reversed ? "md:direction-rtl" : ""}`}>
      <div className={`${reversed ? "md:order-2" : ""} overflow-hidden rounded-lg`}>
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={800}
          height={600}
          className={`w-full h-[350px] lg:h-[450px] object-cover hover-scale rounded-lg ${
            isInView ? (reversed ? "animate-fade-in-right" : "animate-fade-in-left") : "opacity-0"
          }`}
        />
      </div>
      <div className={`${reversed ? "md:order-1" : ""} flex flex-col gap-4 ${
        isInView ? "animate-fade-in" : "opacity-0"
      }`}
        style={{ animationDelay: "0.2s" }}
      >
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title text-foreground">{title}</h2>
        <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-lg">
          {description}
        </p>
        {cta && (
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm hover:gap-3 transition-all duration-300"
          >
            {cta}
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default FeatureSection;
