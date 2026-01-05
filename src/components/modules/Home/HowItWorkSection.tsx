import { CalendarCheck, Search, Smile } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find a Tour',
    description: 'Browse tours by city, category, or guide.',
  },
  {
    icon: CalendarCheck,
    title: 'Book Easily',
    description: 'Choose your date and confirm your booking.',
  },
  {
    icon: Smile,
    title: 'Enjoy the Experience',
    description: 'Meet your guide and explore like a local.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          How It Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
