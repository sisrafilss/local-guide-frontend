export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AdminListingTable from '@/components/modules/Admin/ListingManagement/AdminListingTable';
import AdminListingFilter from '@/components/modules/Admin/ListingManagement/AdminListingFilter';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getListing } from '@/services/guide/listingManagement';
import { Suspense } from 'react';

const AdminManageListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const listingsResult = await getListing(queryString);

  const totalPages = Math.ceil(
    (listingsResult?.meta?.total || 1) / (listingsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto px-4 md:px-6">
      <ScrollReveal variant="fade-down" duration={0.45}>
        <ManagementPageHeader
          title="All Listings Management"
          description="View, monitor and manage all travel listings across the platform as an admin."
        />
      </ScrollReveal>

      {/* Search, Filters */}
      <ScrollReveal variant="fade-up" duration={0.4} amount={0.1}>
        <AdminListingFilter />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={7} rows={8} />}>
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-1 backdrop-blur-sm">
             <AdminListingTable listings={listingsResult?.data || []} />
          </div>
          <div className="mt-6 flex justify-center">
            <TablePagination
              currentPage={listingsResult?.meta?.page || 1}
              totalPages={totalPages || 1}
            />
          </div>
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default AdminManageListingPage;
