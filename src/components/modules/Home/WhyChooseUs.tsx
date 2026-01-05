import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ShieldCheck, Users } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Guides',
    description:
      'All guides are verified to ensure safety, quality, and local expertise.',
  },
  {
    icon: Users,
    title: 'Small Group Tours',
    description: 'Enjoy personalized experiences with small group sizes.',
  },
  {
    icon: MapPin,
    title: 'Authentic Local Experience',
    description:
      'Explore hidden gems and real local culture with expert guides.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          Why Choose Us
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index}>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <Icon className="h-10 w-10 text-primary" />
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
