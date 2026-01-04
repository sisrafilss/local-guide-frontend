'use client';

import { Column } from '@/components/shared/ManagementTable';
import { IListing } from '@/types/listing.interface';

export const listingColumns: Column<IListing>[] = [
  {
    header: 'Title',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.title}</span>
      </div>
    ),
  },
  {
    header: 'Price',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.price}</span>
      </div>
    ),
  },
  {
    header: 'Duration',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.durationMin}</span>
      </div>
    ),
  },
  {
    header: 'Category',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.category}</span>
      </div>
    ),
  },
  {
    header: 'Max Group Size',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.maxGroupSize}</span>
      </div>
    ),
  },
  {
    header: 'City',
    accessor: (listing) => (
      <div className="flex flex-col">
        <span className="text-sm">{listing.city}</span>
      </div>
    ),
  },
];
