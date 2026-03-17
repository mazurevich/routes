export type RouteType = "bike" | "hiking";

export interface Friend {
  id: string;
  name: string;
  initials: string;
  time: string;
  status: "finished" | "in-progress";
  color: string;
}

export interface Review {
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
}

export interface RouteData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  type: RouteType;
  stats: {
    duration: string;
    distance: string;
    elevation: string;
    avgPower: string;
    avgPulse: string;
    maxPulse: string;
    avgSpeed: string;
    maxSpeed: string;
    calories: string;
    cadence: string;
    tss: string;
    normalizedPower: string;
  };
  rating: number;
  ratingCount: number;
  reviews: Review[];
  defaultComment: string;
  friends: Friend[];
}

export const mockRoute: RouteData = {
  id: "galibier-2026-03-15",
  title: "Col du Galibier",
  subtitle: "Classic Alpine Ascent",
  date: "Saturday, March 15, 2026",
  type: "bike",
  stats: {
    duration: "3h 24m",
    distance: "48.2 km",
    elevation: "+1,924 m",
    avgPower: "214 W",
    avgPulse: "148 bpm",
    maxPulse: "176 bpm",
    avgSpeed: "18.4 km/h",
    maxSpeed: "67.2 km/h",
    calories: "1,840 kcal",
    cadence: "82 rpm",
    tss: "184",
    normalizedPower: "228 W",
  },
  rating: 4.5,
  ratingCount: 23,
  reviews: [
    {
      author: "Marcus Weber",
      initials: "MW",
      rating: 5,
      text: "Absolutely stunning climb. The views from the top are unreal — totally worth every steep meter.",
      date: "Mar 12",
    },
    {
      author: "Sophie Laurent",
      initials: "SL",
      rating: 4,
      text: "Great route, but the wind was brutal in the final 2km. Bring a wind jacket.",
      date: "Mar 10",
    },
  ],
  defaultComment:
    "An incredible climb today. Perfect clear skies and a tailwind on the final push. My power numbers stayed steady throughout — really pleased with the consistency. The middle section around km 28 was the toughest, but I nailed the pacing. One for the memory book.",
  friends: [
    {
      id: "1",
      name: "Marcus Weber",
      initials: "MW",
      time: "3h 18m",
      status: "finished",
      color: "#3B82F6",
    },
    {
      id: "2",
      name: "Sophie Laurent",
      initials: "SL",
      time: "3h 31m",
      status: "finished",
      color: "#EC4899",
    },
    {
      id: "3",
      name: "Tobias Koch",
      initials: "TK",
      time: "3h 45m",
      status: "finished",
      color: "#F59E0B",
    },
    {
      id: "4",
      name: "Elena Rossi",
      initials: "ER",
      time: "3h 52m",
      status: "in-progress",
      color: "#10B981",
    },
  ],
};
