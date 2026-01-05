import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';

export default function ExploreToursPage() {
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Cards */}
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="mt-10 text-center">
        <Button variant="outline">Load More Tours</Button>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function TourCard() {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      {/* Image */}
      <div className="h-48 w-full bg-muted" />

      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">
            Old Dhaka Walking Tour
          </h3>
          <Badge variant="secondary">Custom</Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          A guided walking tour through the historic streets of Old Dhaka.
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <Meta icon={MapPin} text="Dhaka" />
          <Meta icon={Clock} text="120 min" />
          <Meta icon={Users} text="Max 5" />
          <Meta icon={DollarSign} text="$25" />
        </div>

        <Button className="w-full">View Details</Button>
      </CardContent>
    </Card>
  );
}

function Meta({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  );
}
