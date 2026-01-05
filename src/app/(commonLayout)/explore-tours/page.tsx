import TourCard from '@/components/modules/ExploreTours/TourCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllTours } from '@/services/tourist/tours';

export default async function ExploreToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const toursResult = await getAllTours(queryString);

  const totalPages = Math.ceil(
    (toursResult?.meta?.total || 1) / (toursResult?.meta?.limit || 1)
  );

  console.log('TOURS RESULT', toursResult);

  return (
    <main className="pb-20">
      {/* Header */}
      <section className="border-b bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold">Explore Tours</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Discover local experiences hosted by expert guides. Browse tours by
            city, category, and interest.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Input placeholder="Search tours..." />
            <Input placeholder="City" />

            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">All Categories</option>
              <option value="FOOD">Food</option>
              <option value="HISTORY">History</option>
              <option value="PHOTOGRAPHY">Photography</option>
              <option value="ADVENTURE">Adventure</option>
              <option value="NIGHTLIFE">Nightlife</option>
              <option value="SHOPPING">Shopping</option>
              <option value="CUSTOM">Custom</option>
            </select>

            <Button variant="outline">Reset Filters</Button>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10">
          {toursResult?.data?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {toursResult.data.map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No tours found.</p>
          )}
        </div>
      </section>

      {/* Load More */}
      {totalPages > 1 && (
        <section className="mt-10 text-center">
          <Button variant="outline">Load More Tours</Button>
        </section>
      )}
    </main>
  );
}
