'use client';
import { TourDetail } from '@/app/(commonLayout)/explore-tours/[id]/page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { bookTourClient } from '@/services/tourist/bookTour.client';
import { getTourbyId } from '@/services/tourist/tours';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TourBookingDialog from '../Tourist/TourBookingDialog';

type BookTourPayload = {
  listingId: string;
  touristId: string;
  guideId: string;
  startAt: string; // ISO string
  totalPrice: number;
};

const SingleTour = () => {
  const params = useParams();
  const id = params?.id;

  const [tour, setTour] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 Booking dialog state
  const [bookingOpen, setBookingOpen] = useState(false);

  // 🔹 TODO: replace with real logged-in tourist id from auth
  const touristId = 'DUMMY_TOURIST_ID';

  const handleBookTour = async (payload: BookTourPayload) => {
    try {
      setBookingOpen(false);

      if (!payload.guideId) {
        toast.error('Guide information missing');
        return;
      }

      const res = await bookTourClient(payload);

      if (!res?.success) {
        toast.error(res?.message || 'Failed to book tour');
        return;
      }

      toast.success('Tour booked successfully 🎉');
    } catch (error: any) {
      toast.error(
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
      );
    }
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid tour ID');
      setLoading(false);
      return;
    }

    const fetchTour = async () => {
      try {
        setLoading(true);
        const res = await getTourbyId(id as string);

        if (!res || !res.success || !res.data) {
          setError(res?.message || 'Tour not found.');
          return;
        }

        const mappedTour: TourDetail = {
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          durationMin: res.data.durationMin,
          meetingPoint: res.data.meetingPoint,
          maxGroupSize: res.data.maxGroupSize,
          category: res.data.category,
          city: res.data.city,
          images: res.data.images || [],
          guide: {
            id: res.data.guide?.id,
            name: res.data.guide?.user?.name || 'Local Guide',
            avatarUrl: res.data.guide?.user?.profilePicUrl,
            bio: 'Verified local guide',
          },
        };

        setTour(mappedTour);
      } catch (err) {
        console.error(err);
        setError('Failed to load tour details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <span className="animate-pulse rounded-full bg-muted px-6 py-3 text-muted-foreground">
          Loading tour details...
        </span>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-500">
        {error || 'Tour not available'}
      </div>
    );
  }

  return (
    <div>
      {/* Image */}
      <section className="relative h-[280px] w-full bg-muted sm:h-[360px] lg:h-[420px]">
        {tour.images.length > 0 ? (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No Images Available
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <Badge className="mb-2">{tour.category}</Badge>
              <h1 className="text-3xl font-bold">{tour.title}</h1>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {tour.city}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Meta
                icon={Clock}
                label="Duration"
                value={`${tour.durationMin} min`}
              />
              <Meta
                icon={Users}
                label="Group Size"
                value={`Max ${tour.maxGroupSize}`}
              />
              <Meta icon={DollarSign} label="Price" value={`$${tour.price}`} />
            </div>

            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">About This Tour</h2>
                <p className="text-muted-foreground">{tour.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Avatar className="h-14 w-14">
                  {tour.guide.avatarUrl && (
                    <AvatarImage src={tour.guide.avatarUrl} />
                  )}
                  <AvatarFallback>{tour.guide.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{tour.guide.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tour.guide.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="lg:sticky lg:top-24">
            <Card className="border-primary/30">
              <CardContent className="space-y-4 p-6">
                <p className="text-2xl font-bold">
                  ${tour.price}
                  <span className="ml-1 text-sm text-muted-foreground">
                    / person
                  </span>
                </p>

                <Button className="w-full" onClick={() => setBookingOpen(true)}>
                  Book This Tour
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Free cancellation up to 24 hours before the tour
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TourBookingDialog
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        tour={tour}
        touristId={touristId}
        onConfirm={handleBookTour}
      />
    </div>
  );
};

export default SingleTour;

/* ---------------- Meta ---------------- */
function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
