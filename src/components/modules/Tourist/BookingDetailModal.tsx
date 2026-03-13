'use client';

import { Booking } from '@/types/tourist.interface';
import { getBookingById, cancelBooking } from '@/services/tourist/booking';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  MapPin,
  User,
  Calendar,
  CreditCard,
  Clock,
  XCircle,
  Loader2,
} from 'lucide-react';

interface BookingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

export default function BookingDetailModal({
  open,
  onOpenChange,
  bookingId,
}: BookingDetailModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBooking = useCallback(async () => {
    if (!bookingId) return;
    
    setLoading(true);
    try {
      const result = await getBookingById(bookingId);
      if (result?.success) {
        setBooking(result.data);
      } else {
        setBooking(null);
        toast.error(result?.message || 'Failed to load booking details');
      }
    } catch {
      setBooking(null);
      toast.error('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (open && bookingId) {
      fetchBooking();
    }
  }, [open, bookingId, fetchBooking]);

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelBooking(bookingId);
      if (result?.success) {
        toast.success('Booking cancelled successfully');
        setBooking((prev) => (prev ? { ...prev, status: 'CANCELLED' } : null));
        router.refresh();
      } else {
        toast.error(result?.message || 'Failed to cancel booking');
      }
    });
  };

  const handleClose = () => {
    setBooking(null);
    onOpenChange(false);
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Booking Details
          </DialogTitle>
          <DialogDescription>
            View the details of your booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{booking.listing.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                {booking.listing.city}
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                'text-sm font-black uppercase tracking-widest px-3',
                booking.status === 'CONFIRMED'
                  ? 'text-emerald-600 border-emerald-500/20'
                  : booking.status === 'CANCELLED'
                  ? 'text-destructive border-destructive/20'
                  : 'text-amber-600 border-amber-500/20'
              )}
            >
              <div
                className={cn(
                  'w-2 h-2 rounded-full mr-2',
                  booking.status === 'CONFIRMED'
                    ? 'bg-emerald-500'
                    : booking.status === 'CANCELLED'
                    ? 'bg-destructive'
                    : 'bg-amber-500 animate-pulse'
                )}
              />
              {booking.status}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Guide Information
              </h4>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden">
                  {booking.guide?.user?.profilePicUrl ? (
                    <img
                      src={booking.guide.user.profilePicUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary/40" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {booking.guide?.user?.name || 'Local Guide'}
                  </p>
                  <p className="text-xs text-muted-foreground">Your Guide</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Booking Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(booking.startAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(booking.startAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.pax} Guests</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="text-2xl font-bold">
                ৳ {booking.totalPrice.toLocaleString()}
              </p>
            </div>
            {booking.notes && (
              <div className="text-right max-w-[200px]">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{booking.notes}</p>
              </div>
            )}
          </div>

          {booking.createdAt && (
            <p className="text-xs text-muted-foreground text-center">
              Booked on{' '}
              {new Date(booking.createdAt).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          {booking.status === 'PENDING' && (
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Booking
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}