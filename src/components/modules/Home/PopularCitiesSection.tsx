import { Card, CardContent } from '@/components/ui/card';

const cities = [
  { name: 'Dhaka', tours: 12 },
  { name: 'Chattogram', tours: 8 },
  { name: 'Sylhet', tours: 6 },
  { name: 'Cox’s Bazar', tours: 10 },
];

const PopularCitiesSection = () => {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          Popular Cities
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {cities.map((city) => (
            <Card key={city.name} className="cursor-pointer hover:shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium">{city.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {city.tours} tours available
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCitiesSection;
