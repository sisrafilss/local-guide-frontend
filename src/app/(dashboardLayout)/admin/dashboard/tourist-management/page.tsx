export const dynamic = 'force-dynamic';

import TouristFilter from '@/components/modules/Admin/TouristManagement/TouristFilter';
import TouristsTable from '@/components/modules/Admin/TouristManagement/TouristTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getTourists } from '@/services/admin/touristsManagement';
import { Suspense } from 'react';

const AdminTouristsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const touristsResult = await getTourists(queryString);

  const totalPages = Math.ceil(
    (touristsResult?.meta?.total || 1) / (touristsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Tourist Management"
        description="Manage tourist information and details"
      />

      {/* Search, Filters */}
      <TouristFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <TouristsTable tourists={touristsResult?.data || []} />
        <TablePagination
          currentPage={touristsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminTouristsManagementPage;
