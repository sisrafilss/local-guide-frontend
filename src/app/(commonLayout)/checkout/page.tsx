'use client';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
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
import { checkAuthStatus } from '@/services/auth/checkAuth.client';

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let tourId = searchParams.get('tourId');
  let touristId = searchParams.get('touristId');
  let guideId = searchParams.get('guideId');
  let tourTitle = searchParams.get('tourTitle');
  let tourImage = searchParams.get('tourImage');
  let date = searchParams.get('date');
  let time = searchParams.get('time');
  let price = searchParams.get('price');

  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeCheckout = async () => {
      if (!tourId || !date || !time || !price) {
        toast.error('Invalid booking details');
        router.push('/');
        return;
      }

      price = price.split('?')[0];

      if (!touristId) {
        const authStatus = await checkAuthStatus();
        if (authStatus.isLoggedIn && authStatus.userId) {
          touristId = authStatus.userId;
          
          const params = new URLSearchParams(searchParams.toString());
          params.set('touristId', touristId);
          router.replace(`/checkout?${params.toString()}`, { scroll: false });
          return;
        }
      }

      setIsReady(true);
    };

    initializeCheckout();
  }, [tourId, date, time, price, touristId, searchParams, router]);

  useEffect(() => {
    if (!isReady) return;

    if (!tourId || !touristId || !date || !time || !price) {
      toast.error('Missing required booking information');
      router.push('/');
    }
  }, [isReady, tourId, touristId, date, time, price, router]);

  const handlePayment = async () => {
    const currentTouristId = searchParams.get('touristId');
    const currentPrice = searchParams.get('price')?.split('?')[0] || '0';
    
    if (!tourId || !currentTouristId || !guideId || !date || !time || !currentPrice) {
      toast.error('Missing required booking information');
      return;
    }

    setLoading(true);

    const bookingData = {
      listingId: tourId,
      touristId: currentTouristId,
      guideId: guideId,
      startAt: new Date(date).toISOString(),
      totalPrice: Number(currentPrice),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      if (data?.success && data?.data?.paymentUrl) {
        window.location.assign(data.data?.paymentUrl);
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

  if (!isReady) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const cleanPrice = price ? price.split('?')[0] : '0';

  return (
    <div className="container mx-auto px-4 py-10 min-h-[70vh] flex items-center justify-center">
      <ScrollReveal variant="zoom-in" duration={0.5} className="w-full max-w-lg">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Confirm Your Booking
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
                <h3 className="font-bold text-lg">
                  {tourTitle || 'Tour Name'}
                </h3>
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
                <span className="font-bold text-xl text-primary">${cleanPrice}</span>
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
      </ScrollReveal>
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
