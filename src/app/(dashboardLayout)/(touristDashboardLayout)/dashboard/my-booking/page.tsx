export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import TouristBookingTable from '@/components/modules/Tourist/TouristBookingTable';
import BookingFilters from '@/components/modules/Tourist/BookingFilters';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllBookings } from '@/services/tourist/booking';
import { Suspense } from 'react';

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
    <div className="space-y-6 max-w-[1400px] mx-auto px-4 md:px-6 pb-12">
      <ScrollReveal variant="fade-down" duration={0.45}>
        <ManagementPageHeader
          title="My Bookings"
          description="View and manage all your tour bookings"
        />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <div className="flex justify-end mb-4">
          <BookingFilters />
        </div>

        {bookingResult?.success ? (
          <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
            <div className="space-y-6 mt-8">
               <TouristBookingTable bookings={bookingResult.data || []} />
               
               <div className="flex justify-center mt-8">
                 <TablePagination
                   currentPage={bookingResult?.meta?.page || 1}
                   totalPages={totalPages || 1}
                 />
               </div>
            </div>
          </Suspense>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 rounded-3xl bg-muted/10 border border-dashed border-border/40">
             <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                <span className="text-xl font-bold">!</span>
             </div>
             <div className="text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Operation Failed</p>
                <p className="text-xs text-muted-foreground mt-1">Failed to load bookings from the server.</p>
             </div>
          </div>
        )}
      </ScrollReveal>
    </div>
  );
};

export default MyBookingPage;
