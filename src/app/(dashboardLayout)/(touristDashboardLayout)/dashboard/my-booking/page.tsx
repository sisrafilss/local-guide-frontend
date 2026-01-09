export const dynamic = 'force-dynamic';

import TouristBookings from '@/components/modules/Tourist/TouristBokings';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllBookings } from '@/services/tourist/booking';

const MyBookingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const bookingResult = await getAllBookings(queryString);

  const totalPages = Math.ceil(
    (bookingResult?.meta?.total || 1) / (bookingResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all your tour bookings
        </p>
      </div>

      {/* Booking List */}
      {bookingResult?.success ? (
        <TouristBookings bookings={bookingResult.data} />
      ) : (
        <div className="py-10 text-center text-muted-foreground">
          Failed to load bookings.
        </div>
      )}

      <TablePagination
        currentPage={bookingResult?.meta?.page || 1}
        totalPages={totalPages || 1}
      />
    </div>
  );
};

export default MyBookingPage;
