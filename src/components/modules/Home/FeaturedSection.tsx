'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import TourCard from '../ExploreTours/TourCard';

type City = {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
};

type Guide = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  imageUrl: string;
};

const FEATURED_CITIES: City[] = [
  {
    id: '1',
    name: 'Cox’s Bazar',
    country: 'Bangladesh',
    imageUrl: '/images/cities/coxs-bazar.jpg',
  },
  {
    id: '2',
    name: 'Sylhet',
    country: 'Bangladesh',
    imageUrl: '/images/cities/sylhet.jpg',
  },
  {
    id: '3',
    name: 'Dhaka',
    country: 'Bangladesh',
    imageUrl: '/images/cities/dhaka.jpg',
  },
];

const TOP_GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Rahim Ahmed',
    city: 'Cox’s Bazar',
    rating: 4.9,
    reviews: 120,
    imageUrl: '/images/guides/guide-1.jpg',
  },
  {
    id: '2',
    name: 'Sadia Khan',
    city: 'Sylhet',
    rating: 4.8,
    reviews: 98,
    imageUrl: '/images/guides/guide-2.jpg',
  },
  {
    id: '3',
    name: 'Tanvir Hasan',
    city: 'Dhaka',
    rating: 4.7,
    reviews: 85,
    imageUrl: '/images/guides/guide-3.jpg',
  },
];

export default function FeaturedSection({
  featuredTours,
}: {
  featuredTours: any;
}) {
  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* ================= Featured Cities ================= */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Tours
            </h2>
            <Button variant="ghost">View all</Button>
          </div>

          <section>
            <div className="mx-auto max-w-7xl px-4 py-10">
              {featuredTours?.data?.length ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredTours.data.map((tour: any) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No tours found.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* ================= Top Rated Guides ================= */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Top-Rated Guides
            </h2>
            <Button variant="ghost">View all</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {TOP_GUIDES.map((guide) => (
              <Card
                key={guide.id}
                className="group rounded-2xl p-4 transition hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={guide.imageUrl}
                      alt={guide.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {guide.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.city}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {guide.rating}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        ({guide.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
