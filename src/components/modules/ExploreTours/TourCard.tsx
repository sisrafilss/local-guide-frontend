import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import Meta from './Meta';

export type Tour = {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMin: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  city: string;
  images: string[];
};

function TourCard({ tour }: { tour: Tour }) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 w-full bg-muted">
        {tour.images.length > 0 && (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">{tour.title}</h3>
          <Badge variant="secondary">{tour.category}</Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {tour.description}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <Meta icon={MapPin} text={tour.city} />
          <Meta icon={Clock} text={`${tour.durationMin} min`} />
          <Meta icon={Users} text={`Max ${tour.maxGroupSize}`} />
          <Meta icon={DollarSign} text={`$${tour.price}`} />
        </div>

        {/* Dynamic Link */}
        <Link href={`/explore-tours/${tour.id}`} passHref>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default TourCard;
