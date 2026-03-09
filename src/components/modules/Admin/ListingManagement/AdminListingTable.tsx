'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { IListing } from '@/types/listing.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { adminListingColumns } from './adminListingColumns';
import AdminListingViewDetailDialog from './AdminListingViewDetailDialog';
import AdminListingFormDialog from './AdminListingFormDialog';
import { deleteListing } from '@/services/guide/listingManagement';
import { MoreHorizontal, Power, Eye, Edit, Trash2 } from 'lucide-react';

interface AdminListingTableProps {
  listings: IListing[];
}

const AdminListingTable = ({ listings }: AdminListingTableProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [viewingListing, setViewingListing] = useState<IListing | null>(null);
  const [editingListing, setEditingListing] = useState<IListing | null>(null);
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
    setEditingListing(listing);
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
      toast.success(result.message || 'Listing deleted successfully');
      setDeletingListing(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete listing');
    }
  };

  const handleToggleStatus = (listing: IListing) => {
    toast.info(`Status toggle for "${listing.title}" initiated... (Simulated)`);
    // This would typically be a specific API call for activation/deactivation
    handleRefresh();
  };

  return (
    <>
      <ManagementTable
        data={listings}
        columns={[
          ...adminListingColumns,
          {
            header: 'Status Control',
            accessor: (listing) => (
              <button
                onClick={() => handleToggleStatus(listing)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  listing.active 
                    ? 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-white' 
                    : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                }`}
              >
                <Power className="h-3 w-3" />
                {listing.active ? 'Disable' : 'Enable'}
              </button>
            ),
          },
        ]}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(listing) => listing.id!}
        emptyMessage="No travel listings found in current filter."
        isRefreshing={isPending}
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
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingListing}
        onOpenChange={(open) => !open && setDeletingListing(null)}
        onConfirm={confirmDelete}
        title="Remove Travel Listing"
        description={`Are you sure you want to permanently remove "${deletingListing?.title}" from the platform? This will affect existing bookings.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminListingTable;
