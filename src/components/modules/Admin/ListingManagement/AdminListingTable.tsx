'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { IListing } from '@/types/listing.interface';
import { useState } from 'react';
import { toast } from 'sonner';
import { adminListingColumns } from './adminListingColumns';
import { DUMMY_LISTINGS } from './dummyData';
import AdminListingViewDetailDialog from './AdminListingViewDetailDialog';
import AdminListingFormDialog from './AdminListingFormDialog';

const AdminListingTable = () => {
  const [listings, setListings] = useState<IListing[]>(DUMMY_LISTINGS);
  const [viewingListing, setViewingListing] = useState<IListing | null>(null);
  const [editingListing, setEditingListing] = useState<IListing | null>(null);
  const [deletingListing, setDeletingListing] = useState<IListing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (listing: IListing) => {
    setViewingListing(listing);
  };

  const handleEdit = (listing: IListing) => {
    setEditingListing(listing);
  };

  const handleDelete = (listing: IListing) => {
    setDeletingListing(listing);
  };

  const confirmDelete = async () => {
    if (!deletingListing) return;

    setIsDeleting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setListings((prev) => prev.filter((l) => l.id !== deletingListing.id));
    setIsDeleting(false);
    setDeletingListing(null);
    toast.success('Listing deleted successfully (Dummy Mode)');
  };

  const handleToggleStatus = (listing: IListing) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id ? { ...l, active: !l.active } : l
      )
    );
    toast.success(`Listing status updated to ${!listing.active ? 'Active' : 'Inactive'} (Dummy Mode)`);
  };

  return (
    <>
      <ManagementTable
        data={listings}
        columns={[
          ...adminListingColumns,
          {
            header: 'Quick Action',
            accessor: (listing) => (
              <button
                onClick={() => handleToggleStatus(listing)}
                className={`text-xs font-medium underline underline-offset-4 ${
                  listing.active ? 'text-destructive' : 'text-emerald-600'
                }`}
              >
                {listing.active ? 'Deactivate' : 'Activate'}
              </button>
            ),
          },
        ]}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(listing) => listing.id!}
        emptyMessage="No Listing found"
      />

      {/* View Listing Detail Dialog */}
      <AdminListingViewDetailDialog
        open={!!viewingListing}
        onClose={() => setViewingListing(null)}
        listing={viewingListing}
      />

      {/* Edit Listing Dialog  */}
      <AdminListingFormDialog
        open={!!editingListing}
        onClose={() => setEditingListing(null)}
        listing={editingListing!}
        onSuccess={() => {
          setEditingListing(null);
          toast.success('Listing updated successfully (Dummy Mode)');
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingListing}
        onOpenChange={(open) => !open && setDeletingListing(null)}
        onConfirm={confirmDelete}
        title="Delete Listing"
        description={`Are you sure you want to delete "${deletingListing?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminListingTable;
