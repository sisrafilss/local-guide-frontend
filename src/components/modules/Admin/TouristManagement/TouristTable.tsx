'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { deleteTourist } from '@/services/admin/touristsManagement';
import { ITourist as ITourists } from '@/types/tourist.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import TouristFormDialog from './TouristFormDialog';
import { touristsColumns } from './touristsColumns';
import TouristViewDetailDialog from './TouristsViewDetailDialog';

interface TouristsTableProps {
  tourists: ITourists[];
}

const TouristsTable = ({ tourists }: TouristsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourist, setDeletingTourist] = useState<ITourists | null>(
    null
  );
  const [viewingTourist, setViewingTourist] = useState<ITourists | null>(null);
  const [editingTourist, setEditingTourist] = useState<ITourists | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (tourist: ITourists) => {
    setViewingTourist(tourist);
  };

  const handleEdit = (tourist: ITourists) => {
    setEditingTourist(tourist);
  };

  const handleDelete = (tourist: ITourists) => {
    setDeletingTourist(tourist);
  };

  const confirmDelete = async () => {
    if (!deletingTourist) return;

    setIsDeleting(true);
    const result = await deleteTourist(deletingTourist.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'Tourist deleted successfully');
      setDeletingTourist(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete tourist');
    }
  };

  return (
    <>
      <ManagementTable
        data={tourists}
        columns={touristsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(tourist) => tourist.id!}
        emptyMessage="No tourist found"
      />

      {/* Edit Tourist Form Dialog */}
      <TouristFormDialog
        open={!!editingTourist}
        onClose={() => setEditingTourist(null)}
        tourist={editingTourist!}
        onSuccess={() => {
          setEditingTourist(null);
          handleRefresh();
        }}
      />

      {/* View Tourist Detail Dialog */}
      <TouristViewDetailDialog
        open={!!viewingTourist}
        onClose={() => setViewingTourist(null)}
        tourist={viewingTourist}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTourist}
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete Tourist"
        description={`Are you sure you want to delete ${deletingTourist?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TouristsTable;
