import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-hk-hiking.jpg";
import { ChevronDown } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [subtitle, setSubtitle] = useState(t("hero.subtitle"));
  const [titleLine1, setTitleLine1] = useState(t("hero.titleLine1"));
  const [titleLine2, setTitleLine2] = useState(t("hero.titleLine2"));
  const [desc, setDesc] = useState(t("hero.description"));

  useEffect(() => {
    setSubtitle(t("hero.subtitle"));
    setTitleLine1(t("hero.titleLine1"));
    setTitleLine2(t("hero.titleLine2"));
    setDesc(t("hero.description"));
  }, [i18n.language, t]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Aerial view of a dramatic Hong Kong hiking trail along a lush green mountain ridge with ocean views"
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <EditableText
          value={subtitle}
          onChange={setSubtitle}
          as="p"
          className="text-primary-foreground/80 uppercase tracking-[0.4em] text-sm mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        />
        <h1 className="hero-title text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <EditableText value={titleLine1} onChange={setTitleLine1} as="span" className="font-light italic" />
          <br />
          <EditableText value={titleLine2} onChange={setTitleLine2} as="span" className="font-semibold" />
        </h1>
        <EditableText
          value={desc}
          onChange={setDesc}
          as="p"
          className="text-primary-foreground/80 text-lg md:text-xl max-w-xl leading-relaxed font-light animate-fade-in"
          style={{ animationDelay: "0.9s" }}
          multiline
        />
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
