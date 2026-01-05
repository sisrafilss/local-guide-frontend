'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BadgeCheck, Map, Users } from 'lucide-react';

export default function BecomeGuideCTA() {
  return (
    <section className="w-full px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Card className="overflow-hidden rounded-3xl border bg-background">
          <CardContent className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
            {/* ================= Text Content ================= */}
            <div className="space-y-5">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Become a Local Guide
              </h2>

              <p className="text-muted-foreground">
                Share your local knowledge, meet travelers from around the
                world, and earn by guiding people through your city.
              </p>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  Earn money doing what you love
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Connect with travelers globally
                </li>
                <li className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-primary" />
                  Showcase your city & culture
                </li>
              </ul>

              <div className="pt-4">
                <Button size="lg" className="gap-2">
                  Become a Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* ================= Visual / Accent ================= */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="relative flex h-full items-center justify-center rounded-2xl border bg-muted">
                <span className="text-lg font-semibold text-muted-foreground">
                  Guide Dashboard Preview
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
