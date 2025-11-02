import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { mockEvents } from "@/data/mockEvents";
import { Sparkles, TrendingUp, LogIn } from "lucide-react";
import heroImage from "@/assets/hero-nightlife.jpg";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "party" | "bar" | "club">("all");
  const [events, setEvents] = useState(mockEvents);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (data && data.length > 0) {
      // Convert database events to match our Event interface
      const dbEvents = data.map(event => ({
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.event_date,
        time: `${event.start_time}${event.end_time ? ' - ' + event.end_time : ''}`,
        cost: event.cost,
        ageRequirement: event.age_requirement,
        attendees: 0, // Will be calculated from RSVPs
        image: event.image_url || mockEvents[0].image,
        category: event.category as "party" | "bar" | "club",
        musicGenre: event.music_genre || "",
        hostName: "Host", // Will be fetched from profiles
        rating: 4.5, // Will be calculated from reviews
        dressCode: event.dress_code,
        drinks: event.drinks_available,
      }));
      setEvents(dbEvents);
    } else if (error) {
      console.error("Error loading events:", error);
      // Fall back to mock events
      setEvents(mockEvents);
    }
  };

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Nightlife"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="relative container h-full flex flex-col justify-end pb-8 space-y-4">
          <Badge variant="gradient" className="w-fit">
            <Sparkles className="w-3 h-3 mr-1" />
            Discover Tonight's Hottest Events
          </Badge>
          
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-primary">
              Find Your Vibe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover the best parties, bars, and clubs near you. Rate, review, and connect with the nightlife community.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {user ? (
              <>
                <Button variant="gradient" size="lg">
                  Explore Now
                </Button>
                <Button variant="outline" size="lg">
                  See Map View
                </Button>
              </>
            ) : (
              <Button variant="gradient" size="lg" onClick={() => navigate("/auth")}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to Explore
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="container py-6 sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Button
            variant={activeFilter === "all" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            All Events
          </Button>
          <Button
            variant={activeFilter === "party" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("party")}
          >
            🎉 Parties
          </Button>
          <Button
            variant={activeFilter === "bar" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("bar")}
          >
            🍺 Bars
          </Button>
          <Button
            variant={activeFilter === "club" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("club")}
          >
            💃 Clubs
          </Button>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container py-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="text-2xl font-bold">Trending Near You</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
