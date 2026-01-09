'use client';

import { Booking } from '@/types/tourist.interface';
import BookingCard from './BookingCard';

interface TouristBookingsProps {
  bookings: Booking[];
}

export default function TouristBookings({ bookings }: TouristBookingsProps) {
  if (!bookings.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
