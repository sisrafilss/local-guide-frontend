'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IListing } from '@/types/listing.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { listingColumns } from './listingColumns';
import ListingFormDialog from './ListingFormDialog';
import ListingViewDetailDialog from './ListingViewDetailDialog';

interface ListingTableProps {
  listings: IListing[];
}

const ListingTable = ({ listings }: ListingTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingListing, setViewingListing] = useState<IListing | null>(null);
  const [editingListing, seteEditingListing] = useState<IListing | null>(null);
  const [deletingListing, setDeletingListing] = useState<IListing | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (listing: IListing) => {
    setViewingListing(listing);
  };
  const handleEdit = (listing: IListing) => {
    seteEditingListing(listing);
  };
  const handleDelete = (listing: IListing) => {
    setDeletingListing(listing);
  };

  return (
    <>
      <ManagementTable
        data={listings}
        columns={listingColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No Listing found"
      />

      {/* View Listing Detail Dialog */}
      <ListingViewDetailDialog
        open={!!viewingListing}
        onClose={() => setViewingListing(null)}
        listing={viewingListing}
      />

      <ListingFormDialog
        open={!!editingListing}
        onClose={() => seteEditingListing(null)}
        listing={editingListing!}
        onSuccess={() => {
          seteEditingListing(null);
          handleRefresh();
        }}
      />
    </>
  );
};

export default ListingTable;
