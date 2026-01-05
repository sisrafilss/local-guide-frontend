import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';

export default function TourDetailPage() {
  return (
    <main className="pb-20">
      {/* Image Gallery */}
      <section className="relative h-[280px] w-full bg-muted sm:h-[360px] lg:h-[420px]">
        {/* Replace with real images */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Tour Images
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Title */}
            <div>
              <Badge className="mb-2">Custom</Badge>
              <h1 className="text-3xl font-bold">Old Dhaka Walking Tour</h1>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Meta icon={Clock} label="Duration" value="120 min" />
              <Meta icon={Users} label="Group Size" value="Max 5" />
              <Meta icon={DollarSign} label="Price" value="$25" />
            </div>

            {/* Description */}
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">About This Tour</h2>
                <p className="leading-relaxed text-muted-foreground">
                  A guided walking tour through the historic streets of Old
                  Dhaka. Experience local culture, heritage, and food with a
                  professional guide.
                </p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">Itinerary</h2>
                <p className="text-muted-foreground">
                  Detailed itinerary will be provided by the guide after
                  booking.
                </p>
              </CardContent>
            </Card>

            {/* Guide Info */}
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://res.cloudinary.com/dxjwdwkv3/image/upload/v1766852276/nw9ue5p2m7d-1766852272351-dhaka-image-jpeg.jpeg.jpg" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold">Guide 1</p>
                  <p className="text-sm text-muted-foreground">
                    Certified local guide
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Booking Card */}
          <div className="lg:sticky lg:top-24">
            <Card className="border-primary/30">
              <CardContent className="space-y-4 p-6">
                <p className="text-2xl font-bold">
                  $25
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    / person
                  </span>
                </p>

                <Button className="w-full">Book This Tour</Button>

                <p className="text-center text-xs text-muted-foreground">
                  Free cancellation up to 24 hours before the tour
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
