export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AdminListingTable from '@/components/modules/Admin/ListingManagement/AdminListingTable';
import AdminListingFilter from '@/components/modules/Admin/ListingManagement/AdminListingFilter';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { Suspense } from 'react';

const AdminManageListingPage = () => {
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
        <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-xl">
          <AdminListingFilter />
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={7} rows={8} />}>
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-1">
             <AdminListingTable />
          </div>
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default AdminManageListingPage;
