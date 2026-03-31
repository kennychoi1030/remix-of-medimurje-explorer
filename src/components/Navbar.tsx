import { Menu, X, User, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { label: t("nav.trails"), href: "#trails" },
    { label: t("nav.exploreGBA"), href: "/explore" },
    { label: t("nav.events"), href: "#events" },
    { label: t("nav.shop"), href: "#shop" },
    { label: t("nav.aiAssistant"), href: "/ai-assistant" },
    { label: t("nav.bookNow"), href: "/booking" },
  ];

  const toggleLang = () => {
    const next = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
  };

  const langLabel = i18n.language === "zh" ? "EN" : "中文";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-foreground/20 backdrop-blur-md" />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="font-display text-2xl font-semibold text-primary-foreground tracking-wide">
            HK Trails
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-primary-foreground/90 hover:text-primary-foreground text-sm font-medium tracking-wider uppercase transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Language Switcher */}
            <li>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground text-sm font-medium tracking-wider transition-colors duration-200 border border-primary-foreground/30 rounded-full px-3 py-1"
              >
                <Globe size={14} />
                {langLabel}
              </button>
            </li>
            <li>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground text-sm font-medium tracking-wider uppercase transition-colors duration-200"
              >
                <User size={16} />
                {t("nav.login")}
              </button>
            </li>
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-primary-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden relative bg-foreground/80 backdrop-blur-lg">
            <ul className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-primary-foreground text-lg font-medium tracking-wider uppercase"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 text-primary-foreground text-lg font-medium tracking-wider border border-primary-foreground/30 rounded-full px-4 py-1"
                >
                  <Globe size={16} />
                  {langLabel}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setOpen(false); setLoginOpen(true); }}
                  className="text-primary-foreground text-lg font-medium tracking-wider uppercase"
                >
                  {t("nav.login")}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm" onClick={() => setLoginOpen(false)}>
          <div className="bg-card rounded-lg p-8 w-full max-w-md mx-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-semibold text-card-foreground">{t("login.title")}</h2>
              <button onClick={() => setLoginOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-1.5">{t("login.email")}</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-1.5">{t("login.password")}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                {t("login.signIn")}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                {t("login.noAccount")}{" "}
                <button className="text-primary font-medium hover:underline">{t("login.signUp")}</button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
