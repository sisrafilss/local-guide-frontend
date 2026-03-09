'use client';

import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/shared/ManagementTable';
import { Booking } from '@/types/tourist.interface';
import { MapPin, User, Calendar, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export const touristBookingColumns: Column<Booking>[] = [
  {
    header: 'Tour Title',
    accessor: (booking) => (
      <div className="flex flex-col gap-1 py-1">
        <span className="font-black text-sm text-foreground tracking-tight group-hover:text-primary transition-colors italic">{booking.listing.title}</span>
        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
           <MapPin className="h-2.5 w-2.5" />
           {booking.listing.city}
        </div>
      </div>
    ),
  },
  {
    header: 'Guide',
    accessor: (booking) => (
       <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden">
             {booking.guide?.user?.profilePicUrl ? (
                <img src={booking.guide.user.profilePicUrl} alt="" className="h-full w-full object-cover" />
             ) : (
                <User className="h-3.5 w-3.5 text-primary/40" />
             )}
          </div>
          <div className="flex flex-col">
             <span className="text-xs font-bold text-foreground/90">{booking.guide?.user?.name || 'Local Guide'}</span>
             <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-tighter">Verified Expert</span>
          </div>
       </div>
    ),
  },
  {
    header: 'Schedule',
    accessor: (booking) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-xs font-black text-foreground italic">
           <Calendar className="h-3 w-3 text-primary/70" />
           {new Date(booking.startAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] ml-4.5">Departure_Gate</span>
      </div>
    ),
  },
  {
    header: 'Financials',
    accessor: (booking) => (
      <div className="flex flex-col">
        <span className="font-black text-sm text-foreground italic">
          ৳ {booking.totalPrice.toLocaleString()}
        </span>
        <div className="flex items-center gap-1 text-[9px] font-medium text-muted-foreground uppercase opacity-70">
           <CreditCard className="h-2.5 w-2.5" />
           {booking.pax} Guests
        </div>
      </div>
    ),
  },
  {
    header: 'State',
    accessor: (booking) => (
        <Badge 
          variant="outline"
          className={cn(
            "text-[9px] font-black uppercase tracking-widest h-6 px-3 rounded-md border shadow-none gap-2 bg-background/50",
            booking.status === 'CONFIRMED' 
              ? 'text-emerald-600 border-emerald-500/20' 
              : booking.status === 'CANCELLED'
              ? 'text-destructive border-destructive/20'
              : 'text-amber-600 border-amber-500/20'
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
