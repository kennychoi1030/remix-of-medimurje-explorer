import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import { MapPin, Clock, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { trails as staticTrails, TrailData } from "@/data/trails";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import TrailFormDialog from "@/components/TrailFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EditableText from "@/components/EditableText";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { localize, type Lang } from "@/types/i18n";
import {
  initTrailStore,
  getTrailStore,
  createTrail,
  updateTrail,
  deleteTrail,
  restoreTrail,
} from "@/services/trail-api";

const TrailsSection = () => {
  const { ref, isInView } = useInView();
  const { isAdmin } = useAdmin();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "zh" ? "zh" : "en") as Lang;

  const [trailList, setTrailList] = useState<TrailData[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTrail, setEditingTrail] = useState<TrailData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TrailData | null>(null);

  const [sectionTitle, setSectionTitle] = useState(t("trails.title"));
  const [sectionSubtitle, setSectionSubtitle] = useState(t("trails.subtitle"));
  const [sectionDesc, setSectionDesc] = useState(t("trails.description"));

  useEffect(() => {
    setSectionTitle(t("trails.title"));
    setSectionSubtitle(t("trails.subtitle"));
    setSectionDesc(t("trails.description"));
  }, [i18n.language, t]);

  useEffect(() => {
    initTrailStore(staticTrails);
    setTrailList(getTrailStore());
  }, []);

  const refresh = () => setTrailList([...getTrailStore()]);
  const featured = trailList.filter((t) => t.isFeatured);
  const featuredCount = featured.length;

  const handleCreate = async (data: Omit<TrailData, "slug">) => {
    await createTrail(data);
    refresh();
    toast.success(i18n.language === "zh" ? "路線建立成功！" : "Trail created successfully!");
  };

  const handleUpdate = async (data: Omit<TrailData, "slug">) => {
    if (!editingTrail) return;
    await updateTrail(editingTrail.slug, data);
    refresh();
    toast.success(i18n.language === "zh" ? "路線更新成功！" : "Trail updated successfully!");
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    await deleteTrail(removed.slug);
    refresh();
    setDeleteTarget(null);
    toast.success(`"${localize(removed.title, lang)}" deleted`, {
      action: {
        label: "Undo",
        onClick: async () => {
          await restoreTrail(removed);
          refresh();
          toast.info("Trail restored!");
        },
      },
    });
  }, [deleteTarget, lang]);

  return (
    <section id="trails" className="py-24 lg:py-32">
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
          <EditableText
            value={sectionDesc}
            onChange={setSectionDesc}
            as="p"
            className={`mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-light ${isInView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
            multiline
          />
        </div>

        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => { setEditingTrail(null); setFormOpen(true); }} className="gap-2">
              <Plus size={16} />
              {t("trails.createNew")}
            </Button>
          </div>
        )}

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((trail, i) => (
              <div
                key={trail.slug}
                className={`group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isInView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                <Link to={`/trail/${trail.slug}`}>
                  <div className="overflow-hidden">
                    <img src={trail.image} alt={localize(trail.title, lang)} loading="lazy" width={800} height={600} className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{localize(trail.title, lang)}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {trail.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {trail.duration}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={14} /> {trail.difficulty}</span>
                    </div>
                    <p className="text-muted-foreground font-light leading-relaxed text-sm">{localize(trail.description, lang)}</p>
                  </div>
                </Link>

                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.preventDefault(); setEditingTrail(trail); setFormOpen(true); }}
                      className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); setDeleteTarget(trail); }}
                      className="p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : isAdmin ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">{t("trails.noFeatured")}</p>
            <Link to="/trails">
              <Button variant="outline">{t("trails.goToList")}</Button>
            </Link>
          </div>
        ) : null}

        <div className="flex justify-center mt-16">
          <Link to="/trails">
            <Button size="lg" variant="outline" className="px-12 py-6 text-base font-medium tracking-wide">
              {t("trails.exploreMore")}
            </Button>
          </Link>
        </div>
      </div>

      <TrailFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingTrail(null); }}
        trail={editingTrail}
        onSubmit={editingTrail ? handleUpdate : handleCreate}
        featuredCount={featuredCount}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemTitle={deleteTarget ? localize(deleteTarget.title, lang) : ""}
        itemType="Trail"
        onConfirm={handleDelete}
      />
    </section>
  );
};

export default TrailsSection;
