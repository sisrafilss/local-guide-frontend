'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/types/tourist.interface';
import Image from 'next/image';
import { toast } from 'sonner';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const handleCancelBooking = async () => {
    const confirmed = confirm('Are you sure you want to cancel this booking?');

    if (!confirmed) return;

    try {
      // TODO: replace with real server function
      // await cancelBooking(booking.id);

      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{booking.listing.title}</CardTitle>

        <Badge
          variant={
            booking.status === 'PENDING'
              ? 'secondary'
              : booking.status === 'CONFIRMED'
              ? 'default'
              : 'destructive'
          }
        >
          {booking.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Guide Info */}
        <div className="flex items-center gap-3">
          <Image
            src={booking.guide.user.profilePicUrl || '/avatar.png'}
            alt={booking.guide.user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{booking.guide.user.name}</p>
            <p className="text-xs text-muted-foreground">Tour Guide</p>
          </div>
        </div>

        {/* Booking Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">City</p>
            <p>{booking.listing.city}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Guests</p>
            <p>{booking.pax}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p>{new Date(booking.startAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Total Price</p>
            <p>৳ {booking.totalPrice}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Booked on {new Date(booking.createdAt).toLocaleString()}
          </p>

          {/* Cancel Button (Only for Pending) */}
          {booking.status === 'PENDING' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancelBooking}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
