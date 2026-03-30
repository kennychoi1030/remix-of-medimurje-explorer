import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Calendar, Users, MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { events as staticEvents, EventData } from "@/data/events";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import EventFormDialog from "@/components/EventFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EditableText from "@/components/EditableText";
import { toast } from "sonner";
import {
  initEventStore,
  getEventStore,
  createEvent,
  updateEvent,
  deleteEvent,
  restoreEvent,
} from "@/services/event-api";

const EventsSection = () => {
  const { ref, isInView } = useInView();
  const { isAdmin } = useAdmin();

  const [eventList, setEventList] = useState<EventData[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventData | null>(null);

  const [sectionTitle, setSectionTitle] = useState("Join Our Adventures");
  const [sectionSubtitle, setSectionSubtitle] = useState("Upcoming Events");

  useEffect(() => {
    initEventStore(staticEvents);
    setEventList(getEventStore());
  }, []);

  const refresh = () => setEventList([...getEventStore()]);
  const featuredCount = eventList.filter((e) => e.isFeatured).length;

  const handleCreate = async (data: Omit<EventData, "id" | "created_at">) => {
    await createEvent(data);
    refresh();
    toast.success("Event created successfully!");
  };

  const handleUpdate = async (data: Omit<EventData, "id" | "created_at">) => {
    if (!editingEvent) return;
    await updateEvent(editingEvent.id, data);
    refresh();
    toast.success("Event updated successfully!");
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    await deleteEvent(removed.id);
    refresh();
    setDeleteTarget(null);
    toast.success(`"${removed.title}" deleted`, {
      action: {
        label: "Undo",
        onClick: async () => {
          await restoreEvent(removed);
          refresh();
          toast.info("Event restored!");
        },
      },
    });
  }, [deleteTarget]);

  // Filter by isFeatured instead of hard-coded slicing
  const featured = eventList.filter((e) => e.isFeatured);

  return (
    <section id="events" className="py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <EditableText
            value={sectionSubtitle}
            onChange={setSectionSubtitle}
            as="p"
            className={`section-subtitle mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}
          />
          <EditableText
            value={sectionTitle}
            onChange={setSectionTitle}
            as="h2"
            className={`section-title text-foreground ${isInView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        {/* Admin: Create button */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => { setEditingEvent(null); setFormOpen(true); }} className="gap-2">
              <Plus size={16} />
              Create New Event
            </Button>
          </div>
        )}

        {/* Featured events */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featured.map((event, i) => (
              <div
                key={event.id}
                className={`group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                <div className="overflow-hidden">
                  <img src={event.image} alt={event.title} loading="lazy" width={800} height={600} className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105" />
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

                {/* Admin action buttons */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingEvent(event); setFormOpen(true); }} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(event)} className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : isAdmin ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg mb-12">
            <p className="text-muted-foreground mb-4">尚未設定首頁精選活動</p>
            <Link to="/events">
              <Button variant="outline">前往列表頁設定精選內容</Button>
            </Link>
          </div>
        ) : null}

        {/* Explore More button */}
        <div className="flex justify-center mt-4">
          <Link to="/events">
            <Button size="lg" variant="outline" className="px-12 py-6 text-base font-medium tracking-wide">
              Explore More Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Dialogs */}
      <EventFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingEvent(null); }}
        event={editingEvent}
        onSubmit={editingEvent ? handleUpdate : handleCreate}
        featuredCount={featuredCount}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemTitle={deleteTarget?.title ?? ""}
        itemType="Event"
        onConfirm={handleDelete}
      />
    </section>
  );
};

export default EventsSection;
