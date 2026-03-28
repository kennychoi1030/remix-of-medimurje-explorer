import { useParams, Link } from "react-router-dom";
import { trails } from "@/data/trails";
import { ArrowLeft, MapPin, Clock, TrendingUp, Ruler, Mountain, Sun, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrailDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const trail = trails.find((t) => t.slug === slug);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!trail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Trail Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Ruler, label: "Distance", value: trail.distance },
    { icon: Clock, label: "Duration", value: trail.duration },
    { icon: Mountain, label: "Elevation", value: trail.elevation },
    { icon: TrendingUp, label: "Difficulty", value: trail.difficulty },
    { icon: Sun, label: "Best Season", value: trail.bestSeason },
    { icon: MapPin, label: "Location", value: trail.location },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={trail.gallery[selectedImg]}
          alt={trail.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          width={1280}
          height={720}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 60%)" }} />
        <Link
          to="/"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground bg-foreground/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        {/* Title & Meta */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary mb-4">
            {trail.difficulty}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">{trail.title}</h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-3xl">{trail.longDescription}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card rounded-lg p-4 text-center shadow-sm">
              <Icon size={20} className="mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="font-display text-sm font-semibold text-card-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Elevation Profile */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Elevation Profile</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trail.elevationProfile} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="elevGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="km"
                  tickFormatter={(v) => `${v} km`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tickFormatter={(v) => `${v} m`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value} m`, "Elevation"]}
                  labelFormatter={(label) => `${label} km`}
                />
                <Area
                  type="monotone"
                  dataKey="elevation"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#elevGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Map / Steps */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Route Guide</h2>
          <div className="space-y-0">
            {trail.routeSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>
                  {i < trail.routeSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Trail Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trail.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
                <ChevronRight size={16} className="text-primary shrink-0" />
                <span className="text-card-foreground text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-24">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trail.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`overflow-hidden rounded-lg aspect-[16/10] transition-all duration-300 ${
                  selectedImg === i
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${trail.title} photo ${i + 1}`}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetail;
