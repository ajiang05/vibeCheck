export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  cost: string;
  ageRequirement: string;
  attendees: number;
  image: string;
  category: "party" | "bar" | "club";
  musicGenre: string;
  hostName: string;
  rating: number;
  dressCode?: string;
  drinks?: boolean;
}
