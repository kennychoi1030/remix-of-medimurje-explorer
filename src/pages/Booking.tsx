import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Users,
  Phone,
  Mail,
  ChevronLeft,
  CheckCircle,
  Loader2,
  MapPin,
  Clock,
  Mountain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trail } from "@/types/booking";
import { fetchTrails, createBooking } from "@/data/mock-api";

const bookingSchema = z.object({
  trailId: z.string().min(1, "Please select a trail"),
  date: z.string().min(1, "Please select a date"),
  participants: z.coerce
    .number()
    .min(1, "At least 1 participant")
    .max(20, "Maximum 20 participants"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Invalid phone number format"),
  notes: z.string().max(500, "Notes too long").optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      trailId: "",
      date: "",
      participants: 1,
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  useEffect(() => {
    fetchTrails().then((data) => {
      setTrails(data);
      setLoading(false);
    });
  }, []);

  const watchTrailId = form.watch("trailId");
  useEffect(() => {
    const trail = trails.find((t) => t.id === watchTrailId);
    setSelectedTrail(trail || null);
    if (trail) form.setValue("date", "");
  }, [watchTrailId, trails]);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    setSubmitting(true);
    try {
      await createBooking(values as { trailId: string; date: string; participants: number; name: string; email: string; phone: string; notes?: string });
      setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-secondary" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            We've sent a confirmation email. Our team will contact you with final details.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <a href="/">Back to Home</a>
            </Button>
            <Button onClick={() => { setSubmitted(false); form.reset(); }}>
              Book Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            Home
          </a>
          <h1 className="font-display text-xl font-semibold text-foreground">
            Book a Trail
          </h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form - 3 cols */}
          <div className="lg:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Trail Selection */}
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    Select Trail
                  </h2>
                  {loading ? (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <FormField
                      control={form.control}
                      name="trailId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {trails.map((trail) => (
                                <button
                                  key={trail.id}
                                  type="button"
                                  onClick={() => field.onChange(trail.id)}
                                  className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 hover:shadow-md ${
                                    field.value === trail.id
                                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                                      : "border-border bg-card hover:border-primary/30"
                                  }`}
                                >
                                  <img
                                    src={trail.image}
                                    alt={trail.title}
                                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-card-foreground truncate">
                                      {trail.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {trail.difficulty} · {trail.duration}
                                    </p>
                                    <p className="text-sm font-semibold text-primary mt-1">
                                      HK${trail.price}
                                      <span className="font-normal text-muted-foreground">
                                        /person
                                      </span>
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Date & Participants */}
                {selectedTrail && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            Date
                          </FormLabel>
                          <FormControl>
                            <select
                              value={field.value}
                              onChange={field.onChange}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="">Select date</option>
                              {selectedTrail.availableDates.map((d) => (
                                <option key={d} value={d}>
                                  {new Date(d).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="participants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <Users size={14} />
                            Participants
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={selectedTrail.maxParticipants}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Personal Info */}
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    Your Details
                  </h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <Mail size={14} />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <Phone size={14} />
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+852 9123 4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any dietary requirements, accessibility needs..."
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Summary Panel - 2 cols */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden">
              {selectedTrail ? (
                <>
                  <img
                    src={selectedTrail.image}
                    alt={selectedTrail.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5 space-y-4">
                    <h3 className="font-display text-xl font-semibold text-card-foreground">
                      {selectedTrail.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        {selectedTrail.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" />
                        {selectedTrail.duration} · {selectedTrail.distance}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mountain size={14} className="text-primary" />
                        {selectedTrail.elevation} elevation · {selectedTrail.difficulty}
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Price per person
                        </span>
                        <span className="font-semibold text-foreground">
                          HK${selectedTrail.price}
                        </span>
                      </div>
                      {form.watch("participants") > 0 && (
                        <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border">
                          <span className="font-semibold text-foreground">
                            Total ({form.watch("participants")} pax)
                          </span>
                          <span className="font-bold text-primary text-lg">
                            HK$
                            {selectedTrail.price * form.watch("participants")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Mountain
                    size={40}
                    className="mx-auto text-muted-foreground/30 mb-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    Select a trail to see details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
