'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { Booking } from '@/types/tourist.interface';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { touristBookingColumns } from './touristBookingColumns';
import { XCircle, MoreHorizontal, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TouristBookingTableProps {
  bookings: Booking[];
}

const TouristBookingTable = ({ bookings }: TouristBookingTableProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleCancel = (id: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), // Simulate cancel
      {
        loading: 'Cancelling booking...',
        success: () => {
          handleRefresh();
          return 'Booking cancelled successfully.';
        },
        error: 'Failed to cancel booking.',
      }
    );
  };

  return (
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCancel(booking.id)}
                    className="h-8 w-8 p-0 rounded-lg text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all shadow-none border border-transparent"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </Button>
                )}
                {booking.status === 'CONFIRMED' && (
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-lg text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all shadow-none border border-transparent"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-lg text-muted-foreground/60 bg-muted/20 hover:bg-muted-foreground hover:text-white transition-all shadow-none border border-transparent"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
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
  );
};

export default TouristBookingTable;
