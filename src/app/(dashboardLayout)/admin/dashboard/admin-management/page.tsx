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
      <ManagementPageHeader
        title="Admin Management"
        description="Manage admin accounts and details"
      />

      {/* Search, Filters */}
      <AdminFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <AdminTable admins={adminsResult?.data || []} />
        <TablePagination
          currentPage={adminsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminManagementPage;
