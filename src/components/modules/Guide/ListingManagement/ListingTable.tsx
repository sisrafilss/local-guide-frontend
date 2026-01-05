'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { deleteListing } from '@/services/guide/listingManagement';
import { IListing } from '@/types/listing.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!deletingListing) return;

    setIsDeleting(true);
    const result = await deleteListing(deletingListing.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'Tour deleted successfully');
      setDeletingListing(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete Tour');
    }
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingListing}
        onOpenChange={(open) => !open && setDeletingListing(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingListing?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ListingTable;
