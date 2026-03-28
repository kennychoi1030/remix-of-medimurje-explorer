import { useInView } from "@/hooks/use-in-view";
import { Calendar, Users, MapPin } from "lucide-react";
import sunsetImg from "@/assets/hk-event-sunset.jpg";
import nightImg from "@/assets/hk-event-night.jpg";

const events = [
  {
    image: sunsetImg,
    title: "Sunset Summit Hike",
    date: "April 12, 2026",
    location: "Lion Rock, Kowloon",
    spots: "20 spots left",
    price: "HK$280",
    description: "Watch the sun set over Victoria Harbour from Lion Rock's iconic summit. Includes guided hike and refreshments.",
  },
  {
    image: nightImg,
    title: "Night Trail Adventure",
    date: "April 26, 2026",
    location: "Lantau Peak",
    spots: "15 spots left",
    price: "HK$350",
    description: "Experience Hong Kong's mountains after dark. Headlamp-lit trail with stargazing and hot drinks at the summit.",
  },
];

const upcomingEvents = [
  { title: "Beginner's Hike: The Peak Circle Walk", date: "May 3, 2026", price: "HK$150" },
  { title: "Photography Hike: Sai Kung Geopark", date: "May 10, 2026", price: "HK$380" },
  { title: "Full Moon Hike: Tai Mo Shan", date: "May 17, 2026", price: "HK$300" },
];

const EventsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="events" className="py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <p className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}>
            Upcoming Events
          </p>
          <h2 className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}>
            Join Our Adventures
          </h2>
        </div>

        {/* Featured events */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-semibold text-card-foreground">{event.title}</h3>
                  <span className="text-primary font-semibold text-lg whitespace-nowrap ml-4">{event.price}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {event.spots}</span>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed text-sm mb-4">{event.description}</p>
                <button className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* More events list */}
        <div className={`bg-card rounded-lg p-6 shadow-sm ${isInView ? "animate-fade-in" : "opacity-0"}`}
             style={{ animationDelay: "0.6s" }}>
          <h3 className="font-display text-xl font-semibold text-card-foreground mb-4">More Upcoming Events</h3>
          <div className="divide-y divide-border">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-card-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">{event.price}</span>
                  <button className="h-8 px-4 rounded-md border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
