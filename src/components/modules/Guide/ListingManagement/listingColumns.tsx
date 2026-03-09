'use client';

import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/shared/ManagementTable';
import { IListing } from '@/types/listing.interface';
import Image from 'next/image';
import { Clock, Users, MapPin } from 'lucide-react';

export const listingColumns: Column<IListing>[] = [
  {
    header: 'Title',
    accessor: (listing) => (
      <div className="flex items-center gap-4 py-1">
        <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-border/50 shadow-sm bg-muted flex-shrink-0 group">
          <Image
            src={listing.imageURL || '/placeholder-listing.png'}
            alt={listing.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-500"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-sm text-foreground tracking-tight truncate group-hover:text-primary transition-colors">{listing.title}</span>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-medium">
             <MapPin className="h-3 w-3 text-primary/60" />
             {listing.city}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: 'Category',
    accessor: (listing) => (
       <Badge variant="outline" className="text-[10px] font-semibold bg-primary/5 text-primary border-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {listing.category}
       </Badge>
    ),
  },
  {
    header: 'Details',
    accessor: (listing) => (
      <div className="flex items-center gap-4">
         <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/50" />
            {listing.durationMin}m
         </div>
         <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-muted-foreground/50" />
            {listing.maxGroupSize} Max
         </div>
      </div>
    ),
  },
  {
    header: 'Price',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="font-bold text-sm text-foreground italic">
          ৳ {listing.price.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: (listing) => (
      <Badge 
        variant={listing.active ? 'outline' : 'secondary'} 
        className={`text-[9px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg border transition-all ${
          listing.active 
            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
            : 'bg-muted text-muted-foreground border-transparent'
        }`}
      >
        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${listing.active ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
        {listing.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];
