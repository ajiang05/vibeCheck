import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, DollarSign } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="gradient" className="backdrop-blur-sm">
            {event.category}
          </Badge>
          <Badge variant="outline" className="backdrop-blur-sm bg-card/80">
            {event.ageRequirement}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-foreground">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{event.rating}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()} • {event.time.split(" - ")[0]}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.attendees} going</span>
            </div>
            
            <div className="flex items-center gap-1 font-semibold text-accent">
              <DollarSign className="w-4 h-4" />
              <span>{event.cost === "Free" ? "Free" : event.cost}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="gradient" size="sm" className="flex-1">
            I'm Going
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
