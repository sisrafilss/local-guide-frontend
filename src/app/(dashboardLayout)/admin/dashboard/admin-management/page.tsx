export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AdminFilter from '@/components/modules/Admin/AdminManagement/AdminFilter';
import AdminTable from '@/components/modules/Admin/AdminManagement/AdminTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getAdmins } from '@/services/admin/adminManagement';
import { Suspense } from 'react';

const AdminManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const adminsResult = await getAdmins(queryString);

  const totalPages = Math.ceil(
    (adminsResult?.meta?.total || 1) / (adminsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ScrollReveal variant="fade-down" duration={0.45}>
        <ManagementPageHeader
          title="Admin Management"
          description="Manage admin accounts and details"
        />
      </ScrollReveal>

      {/* Search, Filters */}
      <ScrollReveal variant="fade-up" duration={0.4} amount={0.1}>
        <AdminFilter />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
          <AdminTable admins={adminsResult?.data || []} />
          <TablePagination
            currentPage={adminsResult?.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default AdminManagementPage;
