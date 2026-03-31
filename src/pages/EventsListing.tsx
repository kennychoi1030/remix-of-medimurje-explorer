import { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, MapPin, Users, Search, X, Plus, Pencil, Trash2, Star } from "lucide-react";
import { events as staticEvents, EventData } from "@/data/events";
import { initEventStore, getEventStore, createEvent, updateEvent, deleteEvent, restoreEvent } from "@/services/event-api";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventFormDialog from "@/components/EventFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { localize, type Lang } from "@/types/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locationOptions = ["Lion Rock, Kowloon", "Lantau Peak", "Victoria Peak", "Sai Kung", "Tai Mo Shan"];

const EventsListing = () => {
  const { isAdmin } = useAdmin();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "zh" ? "zh" : "en") as Lang;
  const [eventList, setEventList] = useState<EventData[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventData | null>(null);

  useEffect(() => {
    initEventStore(staticEvents);
    setEventList(getEventStore());
  }, []);

  const refresh = () => setEventList([...getEventStore()]);
  const featuredCount = useMemo(() => eventList.filter((e) => e.isFeatured).length, [eventList]);

  const filtered = useMemo(() => {
    let results = eventList;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((e) => localize(e.title, lang).toLowerCase().includes(q) || localize(e.description, lang).toLowerCase().includes(q));
    }
    if (locationFilter) results = results.filter((e) => e.location === locationFilter);
    return results;
  }, [eventList, search, locationFilter, lang]);

  const resetFilters = () => { setSearch(""); setLocationFilter(""); };

  const handleCreate = async (data: Omit<EventData, "id" | "created_at">) => {
    await createEvent(data);
    refresh();
    toast.success(lang === "zh" ? "活動建立成功！" : "Event created successfully!");
  };

  const handleUpdate = async (data: Omit<EventData, "id" | "created_at">) => {
    if (!editingEvent) return;
    await updateEvent(editingEvent.id, data);
    refresh();
    toast.success(lang === "zh" ? "活動更新成功！" : "Event updated successfully!");
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    await deleteEvent(removed.id);
    refresh();
    setDeleteTarget(null);
    toast.success(`"${localize(removed.title, lang)}" deleted`, {
      action: {
        label: "Undo",
        onClick: async () => { await restoreEvent(removed); refresh(); toast.info("Event restored!"); },
      },
    });
  }, [deleteTarget, lang]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">{t("events.allEvents")}</h1>
        <p className="text-muted-foreground text-lg mb-10">{t("events.browseDesc")}</p>

        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => { setEditingEvent(null); setFormOpen(true); }} className="gap-2">
              <Plus size={16} /> {t("events.createNew")}
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("events.searchPlaceholder")} className="pl-9" />
          </div>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">{t("events.allLocations")}</option>
            {locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          {(search || locationFilter) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1"><X size={14} /> {t("common.reset")}</Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-4">{t("events.noResults")}</p>
            <Button variant="outline" onClick={resetFilters}>{t("trails.resetFilters")}</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <div key={event.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img src={event.image} alt={localize(event.title, lang)} loading="lazy" width={800} height={600} className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-lg font-semibold text-card-foreground">{localize(event.title, lang)}</h3>
                    <span className="text-primary font-semibold whitespace-nowrap ml-3">{event.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {event.spots}</span>
                  </div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-4">{localize(event.description, lang)}</p>
                  <button className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                    {t("events.bookNow")}
                  </button>
                </div>

                {isAdmin && event.isFeatured && (
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-amber-500 gap-1">
                    <Star size={12} /> {t("admin.featured")}
                  </Badge>
                )}

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
        )}
      </div>
      <Footer />

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
        itemTitle={deleteTarget ? localize(deleteTarget.title, lang) : ""}
        itemType="Event"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EventsListing;
