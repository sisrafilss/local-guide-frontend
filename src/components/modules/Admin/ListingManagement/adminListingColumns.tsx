'use client';

import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/shared/ManagementTable';
import { IListing, ListingCategory } from '@/types/listing.interface';
import Image from 'next/image';

export const adminListingColumns: Column<IListing>[] = [
  {
    header: 'Listing',
    accessor: (listing) => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-md border border-border">
          <Image
            src={listing.imageURL || '/placeholder-listing.png'}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{listing.title}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{listing.city}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Guide',
    accessor: (listing) => (
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 overflow-hidden rounded-full border border-border">
            <Image
                src={listing.guide?.user?.profilePicUrl || '/placeholder-user.png'}
                alt={listing.guide?.user?.name || 'Guide'}
                fill
                className="object-cover"
            />
        </div>
        <span className="text-sm font-medium">{listing.guide?.user?.name || 'Unknown'}</span>
      </div>
    ),
  },
  {
    header: 'Category',
    accessor: (listing) => (
      <Badge variant="outline" className="capitalize font-normal">
        {listing.category.toLowerCase()}
      </Badge>
    ),
  },
  {
    header: 'Price',
    accessor: (listing) => (
      <span className="font-medium text-foreground">${listing.price}</span>
    ),
  },
  {
    header: 'Capacity',
    accessor: (listing) => (
      <span className="text-sm">{listing.maxGroupSize} People</span>
    ),
  },
  {
    header: 'Status',
    accessor: (listing) => (
      <Badge 
        variant={listing.active ? 'outline' : 'secondary'} 
        className={`capitalize font-medium ${listing.active ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : ''}`}
      >
        {listing.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];
