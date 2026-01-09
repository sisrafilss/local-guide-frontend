export const dynamic = 'force-dynamic';

import GuideFilter from '@/components/modules/Admin/GuideManagement/GuideFilter';
import GuideTable from '@/components/modules/Admin/GuideManagement/GuideTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getGuides } from '@/services/admin/guidesManagement';
import { Suspense } from 'react';

const AdminGuideManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const guidesResult = await getGuides(queryString);

  const totalPages = Math.ceil(
    (guidesResult?.meta?.total || 1) / (guidesResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Guide Management"
        description="Manage guide information and details"
      />

      {/* Search, Filters */}
      <GuideFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <GuideTable guides={guidesResult?.data || []} />
        <TablePagination
          currentPage={guidesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminGuideManagementPage;
