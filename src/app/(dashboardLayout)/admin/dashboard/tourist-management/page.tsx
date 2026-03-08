export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
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
      <ScrollReveal variant="fade-down" duration={0.45}>
        <ManagementPageHeader
          title="Tourist Management"
          description="Manage tourist information and details"
        />
      </ScrollReveal>

      {/* Search, Filters */}
      <ScrollReveal variant="fade-up" duration={0.4} amount={0.1}>
        <TouristFilter />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
          <TouristsTable tourists={touristsResult?.data || []} />
          <TablePagination
            currentPage={touristsResult?.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default AdminTouristsManagementPage;
