export interface ITourist {
  id?: string;
  email: string;
  name: string;
  profilePicUrl?: string | null;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  // isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// types/booking.ts

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: string;
  status: BookingStatus;
  startAt: string;
  endAt: string | null;
  totalPrice: string;
  pax: number;
  notes: string | null;
  createdAt: string;

  listing: {
    id: string;
    title: string;
    city: string;
  };

  guide: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicUrl: string | null;
    };
  };
}
