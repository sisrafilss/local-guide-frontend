export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AddListingFormDialogWrapper from '@/components/modules/Guide/ListingManagement/AddListingFormDialogWrapper';
import ListingTable from '@/components/modules/Guide/ListingManagement/ListingTable';
import ListingFilter from '@/components/modules/Guide/ListingManagement/ListringFilter';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
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
  const totalPages =
    Math.ceil(listingResult?.meta?.total?.total || 1) /
      listingResult?.meta?.limit || 1;

  return (
    <div className="space-y-6">
      <ScrollReveal variant="fade-down" duration={0.45}>
        <ManagementPageHeader
          title="Listing Management"
          description="Manage Listings"
        />
      </ScrollReveal>

      {/* Search, Filters */}
      <ScrollReveal variant="fade-up" duration={0.4} amount={0.1}>
        <div className="flex justify-between">
          {' '}
          <ListingFilter />
          <AddListingFormDialogWrapper />
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" amount={0.15}>
        <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
          <ListingTable listings={listingResult?.data || []} />
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default GuideMyListingPage;
