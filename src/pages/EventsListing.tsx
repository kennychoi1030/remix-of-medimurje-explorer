import { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Users, Search, X } from "lucide-react";
import { events as staticEvents, EventData } from "@/data/events";
import { initEventStore, getEventStore } from "@/services/event-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locations = ["Lion Rock, Kowloon", "Lantau Peak", "Victoria Peak", "Sai Kung", "Tai Mo Shan"];

const EventsListing = () => {
  const [eventList, setEventList] = useState<EventData[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    initEventStore(staticEvents);
    setEventList(getEventStore());
  }, []);

  const filtered = useMemo(() => {
    let results = eventList;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    }
    if (locationFilter) {
      results = results.filter((e) => e.location === locationFilter);
    }
    return results;
  }, [eventList, search, locationFilter]);

  const resetFilters = () => { setSearch(""); setLocationFilter(""); };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">All Events</h1>
        <p className="text-muted-foreground text-lg mb-10">Browse and book upcoming hiking events across Hong Kong.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." className="pl-9" />
          </div>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          {(search || locationFilter) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
              <X size={14} /> Reset
            </Button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-4">No events found matching your criteria.</p>
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <div key={event.id} className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img src={event.image} alt={event.title} loading="lazy" width={800} height={600} className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-lg font-semibold text-card-foreground">{event.title}</h3>
                    <span className="text-primary font-semibold whitespace-nowrap ml-3">{event.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {event.spots}</span>
                  </div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-4">{event.description}</p>
                  <button className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsListing;
