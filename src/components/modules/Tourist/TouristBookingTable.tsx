'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { Booking } from '@/types/tourist.interface';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { touristBookingColumns } from './touristBookingColumns';
import { XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingDetailModal from './BookingDetailModal';
import { cancelBooking } from '@/services/tourist/booking';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TouristBookingTableProps {
  bookings: Booking[];
}

const TouristBookingTable = ({ bookings }: TouristBookingTableProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleCancel = async (id: string) => {
    const result = await cancelBooking(id);
    if (result?.success) {
      toast.success('Booking cancelled successfully');
      handleRefresh();
    } else {
      toast.error(result?.message || 'Failed to cancel booking');
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedBookingId(id);
    setDetailModalOpen(true);
  };

  return (
    <>
      <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-sm p-1 transition-all border-2">
        <ManagementTable
          data={bookings}
          columns={[
            ...touristBookingColumns,
            {
              header: 'Actions',
              accessor: (booking) => (
                <div className="flex items-center gap-2">
                  {booking.status === 'PENDING' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-lg text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all shadow-none border border-transparent"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this booking? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancel(booking.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewDetails(booking.id)}
                    className="h-8 px-3 gap-1.5 rounded-lg border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all font-medium text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Details
                  </Button>
                </div>
              ),
            },
          ]}
          getRowKey={(booking) => booking.id}
          emptyMessage="No bookings found."
          isRefreshing={isPending}
        />
      </div>

      {selectedBookingId && (
        <BookingDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          bookingId={selectedBookingId}
        />
      )}
    </>
  );
};

export default TouristBookingTable;
