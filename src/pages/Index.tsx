import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrailsSection from "@/components/TrailsSection";
import StatsSection from "@/components/StatsSection";
import EventsSection from "@/components/EventsSection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import AdminBar, { AdminToggle } from "@/components/AdminBar";
import { useAdmin } from "@/context/AdminContext";

const Index = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className={`min-h-screen ${isAdmin ? "pt-10" : ""}`}>
      <AdminBar />
      <AdminToggle />
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
