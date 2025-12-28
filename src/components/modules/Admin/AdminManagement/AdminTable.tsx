'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';

import { IAdmin } from '@/types/admin.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteAdmin } from '@/services/admin/adminManagement';
import { adminColumns } from './adminColumns';
import AdminFormDialog from './AdminFormDialog';
import AdminViewDetailDialog from './AdminViewDetailDialog';

interface AdminTableProps {
  admins: IAdmin[];
}

const AdminTable = ({ admins }: AdminTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingAdmin, setViewingAdmin] = useState<IAdmin | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<IAdmin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<IAdmin | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (admin: IAdmin) => {
    setViewingAdmin(admin);
  };

  const handleEdit = (admin: IAdmin) => {
    setEditingAdmin(admin);
  };

  const handleDelete = (admin: IAdmin) => {
    setDeletingAdmin(admin);
  };

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    setIsDeleting(true);
    const result = await deleteAdmin(deletingAdmin.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'Admin deleted successfully');
      setDeletingAdmin(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete admin');
    }
  };

  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No Admin found"
      />

      {/* View Admin Detail Dialog */}
      <AdminViewDetailDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        admin={viewingAdmin}
      />

      {/* Edit Admin Form Dialog */}
      <AdminFormDialog
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        admin={editingAdmin!}
        onSuccess={() => {
          setEditingAdmin(null);
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminTable;
