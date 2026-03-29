import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/context/AdminContext";
import Index from "./pages/Index.tsx";
import TrailDetail from "./pages/TrailDetail.tsx";
import AIAssistant from "./pages/AIAssistant.tsx";
import Booking from "./pages/Booking.tsx";
import GBAExplore from "./pages/GBAExplore.tsx";
import TrailsListing from "./pages/TrailsListing.tsx";
import EventsListing from "./pages/EventsListing.tsx";
import ShopListing from "./pages/ShopListing.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trails" element={<TrailsListing />} />
            <Route path="/trail/:slug" element={<TrailDetail />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/explore" element={<GBAExplore />} />
            <Route path="/events" element={<EventsListing />} />
            <Route path="/shop" element={<ShopListing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
