'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IGuide } from '@/types/guide.interface';
import { useState } from 'react';
import { guideColumns } from './tuideColumns';

interface GuideTableProps {
  guides: IGuide[];
}

const GuideTable = ({ guides }: GuideTableProps) => {
  const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
  const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingGuide, setDeletingGuide] = useState<IGuide | null>(null);

  const handleView = (guide: IGuide) => {
    setViewingGuide(guide);
  };

  const handleEdit = (guide: IGuide) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IGuide) => {
    setDeletingGuide(guide);
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
    </>
  );
};

export default GuideTable;
