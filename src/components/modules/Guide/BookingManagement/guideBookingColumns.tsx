'use client';

import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/shared/ManagementTable';
import { Booking } from '@/types/tourist.interface';
import { formatDateTime } from '@/lib/formatters';
import { Clock, CheckCircle2, XCircle, User, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export const guideBookingColumns: Column<Booking>[] = [
  {
    header: 'Listing',
    accessor: (booking) => (
      <div className="flex flex-col gap-1 py-1">
        <span className="font-bold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">{booking.listing.title}</span>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider opacity-60">
           <MapPin className="h-2.5 w-2.5" />
           {booking.listing.city}
        </div>
      </div>
    ),
  },
  {
    header: 'Tourist',
    accessor: (booking) => (
       <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted/50 border flex items-center justify-center">
             <User className="h-3 w-3 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-foreground/80">{booking.touristName || booking.guide?.user?.name || 'Tourist'}</span>
       </div>
    ),
  },
  {
    header: 'Date',
    accessor: (booking) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold text-foreground">
          {new Date(booking.startAt).toLocaleDateString()}
        </span>
        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">Starts at</span>
      </div>
    ),
  },
  {
    header: 'Price',
    accessor: (booking) => (
      <div className="flex flex-col">
        <span className="font-bold text-sm text-foreground italic">
          {booking.totalPrice.toLocaleString()} <span className="text-[10px]">BDT</span>
        </span>
        <span className="text-[9px] font-medium text-muted-foreground uppercase opacity-60 leading-none">{booking.pax} Guests</span>
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: (booking) => (
        <Badge 
          variant="outline"
          className={cn(
            "text-[9px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg border shadow-none gap-2",
            booking.status === 'CONFIRMED' 
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
              : booking.status === 'CANCELLED'
              ? 'bg-destructive/10 text-destructive border-destructive/20'
              : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
          )}
        >
          <div className={cn("w-1.5 h-1.5 rounded-full", 
            booking.status === 'CONFIRMED' ? 'bg-emerald-500' : 
            booking.status === 'CANCELLED' ? 'bg-destructive' : 'bg-amber-500 animate-pulse'
          )} />
          {booking.status}
        </Badge>
    ),
  },
];
