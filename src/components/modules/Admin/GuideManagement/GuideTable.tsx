'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { deleteGuide } from '@/services/admin/guidesManagement';
import { IGuide } from '@/types/guide.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import GuideFormDialog from './GuideFormDialog';
import GuideViewDetailDialog from './GuideViewDetailDialog';
import { guideColumns } from './tuideColumns';

interface GuideTableProps {
  guides: IGuide[];
}

const GuideTable = ({ guides }: GuideTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
  const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingGuide, setDeletingGuide] = useState<IGuide | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (guide: IGuide) => {
    setViewingGuide(guide);
  };

  const handleEdit = (guide: IGuide) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IGuide) => {
    setDeletingGuide(guide);
  };

  const confirmDelete = async () => {
    if (!deletingGuide) return;

    setIsDeleting(true);
    const result = await deleteGuide(deletingGuide.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'Guide deleted successfully');
      setDeletingGuide(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete tourist');
    }
  };

  return (
    <>
      <ManagementTable
        data={guides}
        columns={guideColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guide) => guide.id!}
        emptyMessage="No Guide found"
      />

      {/* View Guide Detail Dialog */}
      <GuideViewDetailDialog
        open={!!viewingGuide}
        onClose={() => setViewingGuide(null)}
        guide={viewingGuide}
      />

      {/* Edit Guide Form Dialog */}
      <GuideFormDialog
        open={!!editingGuide}
        onClose={() => setEditingGuide(null)}
        guide={editingGuide!}
        onSuccess={() => {
          setEditingGuide(null);
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuide}
        onOpenChange={(open) => !open && setDeletingGuide(null)}
        onConfirm={confirmDelete}
        title="Delete Guide"
        description={`Are you sure you want to delete ${deletingGuide?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GuideTable;
