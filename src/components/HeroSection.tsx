import heroImage from "@/assets/hero-hk-hiking.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Aerial view of a dramatic Hong Kong hiking trail along a lush green mountain ridge with ocean views"
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        width={1920}
        height={1080}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-primary-foreground/80 uppercase tracking-[0.4em] text-sm mb-6 animate-fade-in"
           style={{ animationDelay: "0.3s", opacity: 0 }}>
          Hong Kong Hiking
        </p>
        <h1 className="hero-title text-primary-foreground mb-6 animate-fade-in"
            style={{ animationDelay: "0.6s", opacity: 0 }}>
          <em className="font-light italic">Explore</em>
          <br />
          <span className="font-semibold">Hong Kong Trails</span>
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl leading-relaxed font-light animate-fade-in"
           style={{ animationDelay: "0.9s", opacity: 0 }}>
          Discover world-class hiking trails with breathtaking views of mountains, coastlines, and the iconic skyline.
        </p>
      </div>

      <a
        href="#trails"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
