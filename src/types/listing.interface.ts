export enum ListingCategory {
  FOOD = 'FOOD',
  HISTORY = 'HISTORY',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  ADVENTURE = 'ADVENTURE',
  NIGHTLIFE = 'NIGHTLIFE',
  SHOPPING = 'SHOPPING',
  CUSTOM = 'CUSTOM',
}

export type IListing = {
  id?: string;
  title: string;
  description: string;
  itinerary?: string | null;
  price: string; // Decimal serialized as string
  durationMin: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: ListingCategory;
  active: boolean;
  city: string;
  lat?: number | null;
  lng?: number | null;
  images: {
    id: string;
    url: string;
  }[];
  guide: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicUrl: string;
    };
  };
};
