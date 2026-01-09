import SingleTour from '@/components/modules/Tours/SingleTour';
import { bookTour } from '@/services/tourist/tours';
import { toast } from 'sonner';

type BookTourPayload = {
  listingId: string;
  touristId: string;
  guideId: string;
  startAt: string; // ISO string
  totalPrice: number;
};

export type TourDetail = {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMin: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  city: string;
  images: string[];
  guide: {
    id?: string;
    name: string;
    avatarUrl?: string;
    bio?: string;
  };
};

export default function TourDetailPage() {
  const handleBookTour = async (payload: BookTourPayload) => {
    console.log('RESULT', payload);
    try {
      // Optional: close dialog immediately for better UX
      // setBookingOpen(false);

      const res = await bookTour(payload);

      if (!res || !res.success) {
        toast.error(res?.message || 'Failed to book tour');
        return;
      }

      toast.success('Tour booked successfully 🎉');

      // OPTIONAL (later)
      // router.push('/dashboard/bookings');
    } catch (error: any) {
      console.error(error);
      toast.error(
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong while booking'
      );
    }
  };

  return (
    <>
      <main className="pb-20">
        <SingleTour />
      </main>

      {/* 🔥 Booking Dialog */}
    </>
  );
}

/*

*/
