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
import { Power, Settings2, Eye, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ListingTableProps {
  listings: IListing[];
}

const ListingTable = ({ listings }: ListingTableProps) => {
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
    toast.info(`Updating status for "${listing.title}"...`);
    // This would call the real status update API
    handleRefresh();
  };

  return (
    <>
      <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-sm p-1 transition-all">
        <ManagementTable
          data={listings}
          columns={[
            ...listingColumns,
            {
              header: 'Actions',
              accessor: (listing) => (
                <div className="flex items-center gap-1.5">
                   <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleToggleStatus(listing)}
                      className={`h-8 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all gap-1.5 shadow-none border border-transparent hover:border-border ${
                        listing.active 
                          ? 'text-destructive bg-destructive/5 hover:bg-destructive hover:text-white' 
                          : 'text-emerald-500 bg-emerald-500/5 hover:bg-emerald-600 hover:text-white'
                      }`}
                   >
                      <Power className="h-3 w-3" />
                      {listing.active ? 'Disable' : 'Enable'}
                   </Button>
                </div>
              ),
            },
          ]}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowKey={(listing) => listing.id!}
          emptyMessage="No listings found matching criteria."
          isRefreshing={isPending}
        />
      </div>

      {/* View Listing Detail Dialog */}
      <ListingViewDetailDialog
        open={!!viewingListing}
        onClose={() => setViewingListing(null)}
        listing={viewingListing}
      />

      <ListingFormDialog
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
        title="Delete Listing"
        description={`Are you sure you want to delete "${deletingListing?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ListingTable;
