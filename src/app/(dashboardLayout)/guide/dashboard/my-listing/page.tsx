export const dynamic = 'force-dynamic';

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
      <ManagementPageHeader
        title="Listing Management"
        description="Manage Listings"
      />

      {/* Search, Filters */}
      <div className="flex justify-between">
        {' '}
        <ListingFilter />
        <AddListingFormDialogWrapper />
      </div>

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ListingTable listings={listingResult?.data || []} />
      </Suspense>
    </div>
  );
};

export default GuideMyListingPage;
