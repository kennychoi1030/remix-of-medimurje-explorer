import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">HK Trails</h3>
            <p className="text-background/60 font-light leading-relaxed">
              Your premium guide to Hong Kong's best hiking experiences. We connect outdoor enthusiasts with unforgettable trails, guided events, and quality gear.
            </p>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">Explore</h4>
            <ul className="space-y-3 text-background/60">
              <li><a href="#trails" className="hover:text-background transition-colors">Hiking Trails</a></li>
              <li><a href="#events" className="hover:text-background transition-colors">Events</a></li>
              <li><a href="#shop" className="hover:text-background transition-colors">Gear Shop</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Trail Safety Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-background/60">
              <li className="flex items-center gap-2"><MapPin size={16} /> Central, Hong Kong</li>
              <li className="flex items-center gap-2"><Mail size={16} /> hello@hktrails.com</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +852 1234 5678</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-background/60 hover:text-background transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center text-background/40 text-sm">
          © {new Date().getFullYear()} HK Trails. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
