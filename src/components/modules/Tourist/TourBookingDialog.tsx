'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { format } from 'date-fns';
import { CalendarDays, Clock, DollarSign, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

interface TourBookingDialogProps {
  open: boolean;
  onClose: () => void;
  tour: any;
  touristId: string;
  onConfirm: (payload: {
    listingId: string;
    touristId: string;
    guideId: string;
    startAt: string;
    totalPrice: number;
  }) => void;
}

const TourBookingDialog = ({
  open,
  onClose,
  tour,
  touristId,
  onConfirm,
}: TourBookingDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const totalPrice = Number(tour.price);

  const handleConfirm = () => {
    if (!selectedDate) return;

    onConfirm({
      listingId: tour.id,
      touristId,
      guideId: tour.guide.id,
      startAt: selectedDate.toISOString(),
      totalPrice,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b">
          <DialogTitle className="text-2xl font-bold">
            Book This Tour
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* LEFT: Tour Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{tour.title}</h2>

            <p className="text-sm text-muted-foreground">{tour.description}</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{tour.city}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{tour.durationMin} minutes</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Max group size: {tour.maxGroupSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">${tour.price}</span>
              </div>
            </div>

            <Badge variant="secondary" className="w-fit">
              {tour.category}
            </Badge>
          </div>

          {/* RIGHT: Booking Calendar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Select a date</h3>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              className="rounded-md border"
            />

            {selectedDate && (
              <p className="text-sm text-muted-foreground">
                Selected date:{' '}
                <span className="font-medium">
                  {format(selectedDate, 'PPP')}
                </span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 bg-muted/40">
          <div className="text-sm">
            Total price: <span className="font-bold">${totalPrice}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedDate}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourBookingDialog;
