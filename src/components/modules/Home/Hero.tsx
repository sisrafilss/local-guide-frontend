'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

type City = {
  id: string;
  name: string;
  country: string;
};

const FAKE_CITIES: City[] = [
  { id: '1', name: 'Dhaka', country: 'Bangladesh' },
  { id: '2', name: 'Cox’s Bazar', country: 'Bangladesh' },
  { id: '3', name: 'Sylhet', country: 'Bangladesh' },
  { id: '4', name: 'Chittagong', country: 'Bangladesh' },
];

export default function HeroSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    // 🔁 Replace this with backend API later
    const filtered = FAKE_CITIES.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setShowDropdown(true);
  };

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowDropdown(false);

    // 🔁 Later: router.push(`/search?city=${city.id}`)
  };

  const handleSubmit = () => {
    if (!query) return;

    // 🔁 Later: call backend or navigate to results page
    console.log('Searching for:', query);
  };

  return (
    <section className="w-full px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Heading */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Where are you going?
        </h1>
        <p className="mb-8 text-muted-foreground">
          Discover cities and connect with top-rated local guides
        </p>

        {/* Search Box */}
        <div className="relative">
          <div className="flex items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm">
            <MapPin className="ml-2 h-5 w-5 text-muted-foreground" />

            <Input
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search city or destination"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <Button onClick={handleSubmit} className="rounded-xl">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border bg-background shadow-lg">
              {results.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-muted"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{city.name}</span>
                  <span className="text-muted-foreground">
                    , {city.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
