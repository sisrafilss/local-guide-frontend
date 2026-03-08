import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  type LucideIcon,
  MapPin,
  Smile,
  Users,
} from 'lucide-react';

export default function BecomeGuidePage() {
  return (
    <main className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <ScrollReveal variant="blur-up">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold">Become a Local Guide</h1>
            <p className="mt-4 text-muted-foreground">
              Share your local knowledge, meet travelers from around the world,
              and earn money doing what you love.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg">Apply Now</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Become a Guide */}
      <section>
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-10 text-center text-3xl font-semibold">
              Why Become a Guide?
            </h2>
          </ScrollReveal>

          <ScrollStagger className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={Briefcase}
                title="Earn on Your Schedule"
                description="Create tours, set your price, and guide when it suits you."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={Users}
                title="Meet New People"
                description="Connect with travelers from different cultures."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={MapPin}
                title="Showcase Your City"
                description="Share hidden gems and authentic local experiences."
              />
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-10 text-center text-3xl font-semibold">
              Who Can Apply?
            </h2>
          </ScrollReveal>

          <ScrollStagger className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={BadgeCheck}
                title="Local Experts"
                description="You know your city well and love sharing stories."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={Smile}
                title="Friendly & Professional"
                description="You enjoy meeting people and guiding groups."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={CalendarCheck}
                title="Reliable"
                description="You respect time and commitments."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <InfoCard
                icon={Users}
                title="Any Experience Level"
                description="First-time guides are welcome."
              />
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-10 text-center text-3xl font-semibold">
              How It Works
            </h2>
          </ScrollReveal>

          <ScrollStagger className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <ScrollStaggerItem variant="fade-up">
              <Step
                step="1"
                title="Apply as a Guide"
                description="Fill out a simple application with your details."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <Step
                step="2"
                title="Create Your Listings"
                description="Add tours with price, duration, and description."
              />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="fade-up">
              <Step
                step="3"
                title="Start Guiding"
                description="Accept bookings and host amazing experiences."
              />
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-10 text-center text-3xl font-semibold">
              Guide Benefits
            </h2>
          </ScrollReveal>

          <ScrollStagger className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <ScrollStaggerItem variant="pop">
              <Benefit text="No upfront fees" />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="pop">
              <Benefit text="Full control over pricing" />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="pop">
              <Benefit text="Flexible schedule" />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="pop">
              <Benefit text="Secure payments" />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="pop">
              <Benefit text="Admin support" />
            </ScrollStaggerItem>
            <ScrollStaggerItem variant="pop">
              <Benefit text="Grow your personal brand" />
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <ScrollReveal variant="zoom-in" className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-semibold">Ready to Start Guiding?</h2>
          <p className="mt-4 text-muted-foreground">
            Join our community of local guides and turn your knowledge into
            income.
          </p>

          <Button size="lg" className="mt-8">
            Become a Guide
          </Button>
        </ScrollReveal>
      </section>
    </main>
  );
}

/* ---------------- Small Reusable Components ---------------- */

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <Icon className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Step({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
        {step}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="rounded-md border bg-background p-4 text-center text-sm">
      {text}
    </div>
  );
}
