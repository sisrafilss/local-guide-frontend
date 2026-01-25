'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Clock, CreditCard, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tourId = searchParams.get('tourId');
  const touristId = searchParams.get('touristId');
  const guideId = searchParams.get('guideId');
  const tourTitle = searchParams.get('tourTitle');
  const tourImage = searchParams.get('tourImage');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const price = searchParams.get('price');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tourId || !date || !time || !price) {
      toast.error('Invalid booking details');
      router.push('/');
    }
  }, [tourId, date, time, price, router]);

  const handlePayment = async () => {
    if (!tourId || !touristId || !guideId || !date || !time || !price) {
      toast.error('Missing required booking information');
      return;
    }

    setLoading(true);

    const bookingData = {
      listingId: tourId,
      guideId: guideId,
      startAt: new Date().toISOString(),
      totalPrice: Number(price),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      if (data?.success && data?.data?.paymentUrl) {
        window.location.href = data.data?.paymentUrl;
        return;
      }

      toast.error(data?.message || 'Failed to initiate payment');

      console.log('BOOKING DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Confirm Your Booking TTTT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tour Preview */}
          <div className="flex gap-4 items-center">
            {tourImage && (
              <img
                src={tourImage}
                alt={tourTitle || 'Tour'}
                className="w-24 h-24 object-cover rounded-md"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">{tourTitle || 'Tour Name'}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> Booking Reference
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <span className="font-medium">
                {date ? new Date(date).toLocaleDateString() : 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </div>
              <span className="font-medium">{time}</span>
            </div>

            <div className="flex items-center justify-between border-t border-dashed pt-4">
              <span className="font-bold text-lg">Total Price</span>
              <span className="font-bold text-xl text-primary">${price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg py-6"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay & Book Now'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
