'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { Booking } from '@/types/tourist.interface';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { guideBookingColumns } from './guideBookingColumns';
import { CheckCircle2, XCircle, MoreHorizontal, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuideBookingTableProps {
  bookings: Booking[];
}

const GuideBookingTable = ({ bookings }: GuideBookingTableProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const updateStatus = (id: string, status: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)), // Simulation
      {
        loading: `Updating booking status to ${status}...`,
        success: () => {
          handleRefresh();
          return `Booking status updated to ${status}.`;
        },
        error: "Failed to update booking status.",
      }
    );
  };

  return (
    <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-sm p-1 transition-all">
      <ManagementTable
        data={bookings}
        columns={[
          ...guideBookingColumns,
          {
            header: 'Actions',
            accessor: (booking) => (
              <div className="flex items-center gap-2">
                {booking.status === 'PENDING' && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                      className="h-8 w-8 p-0 rounded-lg text-emerald-500 bg-emerald-500/5 hover:bg-emerald-600 hover:text-white transition-all shadow-none border border-transparent"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => updateStatus(booking.id, 'CANCELLED')}
                      className="h-8 w-8 p-0 rounded-lg text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all shadow-none border border-transparent"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
                {booking.status !== 'PENDING' && (
                   <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/60 text-[8px] font-bold uppercase tracking-widest text-muted-foreground italic select-none">
                      Completed
                   </div>
                )}
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

export default GuideBookingTable;
