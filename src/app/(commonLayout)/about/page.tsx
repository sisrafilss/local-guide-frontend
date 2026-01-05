import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="w-full px-4 py-20">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* ================= Header ================= */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            About Local Guide
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Connecting travelers with trusted local guides to create authentic,
            unforgettable experiences.
          </p>
        </div>

        {/* ================= Mission ================= */}
        <Card className="rounded-3xl">
          <CardContent className="space-y-4 p-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              We believe the best way to explore a destination is through the
              people who live there. Our mission is to empower local guides
              while helping travelers discover cities beyond typical tourist
              paths.
            </p>
          </CardContent>
        </Card>

        {/* ================= Values ================= */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="space-y-3 p-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">
                Authentic Experiences
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore cities through real local perspectives.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="space-y-3 p-6">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">
                Community Driven
              </h3>
              <p className="text-sm text-muted-foreground">
                Built for locals and travelers alike.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="space-y-3 p-6">
              <Star className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-foreground">Quality & Trust</h3>
              <p className="text-sm text-muted-foreground">
                Verified guides and transparent reviews.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
