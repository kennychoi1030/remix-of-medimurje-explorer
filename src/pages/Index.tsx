import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrailsSection from "@/components/TrailsSection";
import StatsSection from "@/components/StatsSection";
import EventsSection from "@/components/EventsSection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrailsSection />
      <StatsSection />
      <EventsSection />
      <ShopSection />
      <Footer />
    </div>
  );
};

export default Index;
