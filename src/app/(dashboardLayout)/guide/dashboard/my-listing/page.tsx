export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AddListingFormDialogWrapper from '@/components/modules/Guide/ListingManagement/AddListingFormDialogWrapper';
import ListingTable from '@/components/modules/Guide/ListingManagement/ListingTable';
import ListingFilter from '@/components/modules/Guide/ListingManagement/ListingFilter';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getListing } from '@/services/guide/listingManagement';

import { Suspense } from 'react';

const GuideMyListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchPaamsObj = await searchParams;
  const queryString = queryStringFormatter(searchPaamsObj);

  const listingResult = await getListing(queryString);
  
  // Reverted to standard pagination logic as per admin patterns
  const totalPages = Math.ceil(
    (listingResult?.meta?.total || 1) / (listingResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto px-4 md:px-6 pb-12">
      <ScrollReveal variant="fade-down" duration={0.45}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <ManagementPageHeader
             title="Listing Management"
             description="Manage Listings"
           />
           <div className="flex-shrink-0">
              <AddListingFormDialogWrapper />
           </div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" duration={0.4} amount={0.1}>
        <div className="flex items-start gap-4 flex-wrap lg:flex-nowrap">
          <ListingFilter />
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={7} rows={8} />}>
          <div className="space-y-6">
             <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-sm p-1">
                <ListingTable listings={listingResult?.data || []} />
             </div>
             
             <div className="flex justify-center mt-6">
               <TablePagination
                 currentPage={listingResult?.meta?.page || 1}
                 totalPages={totalPages || 1}
               />
             </div>
          </div>
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default GuideMyListingPage;
