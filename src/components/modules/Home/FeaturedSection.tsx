'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

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

export default function FeaturedSection() {
  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* ================= Featured Cities ================= */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Cities
            </h2>
            <Button variant="ghost">View all</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FEATURED_CITIES.map((city) => (
              <Card key={city.id} className="group overflow-hidden rounded-2xl">
                <div className="relative h-44 w-full">
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <CardContent className="space-y-1 p-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {city.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {city.country}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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
