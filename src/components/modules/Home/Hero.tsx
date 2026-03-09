'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Compass, ShieldCheck, Star, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const router = useRouter();

  const handleSearchChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = FAKE_CITIES.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setShowDropdown(true);
  };

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!query) return;
    router.push(`/explore-tours?searchTerm=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6 lg:px-12 bg-black">
      {/* Hero Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
        style={{ backgroundImage: 'url("/images/hero/hero-bg.png")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      
      {/* Dynamic Floating Particles mockup */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 blur-[100px] animate-pulse rounded-full" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] animate-pulse rounded-full" />
      </div>

      <div className="relative z-20 max-w-5xl w-full text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="h-[1px] w-12 bg-primary/40 md:w-20" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Travel_Deployment.v1</span>
             <div className="h-[1px] w-12 bg-primary/40 md:w-20" />
          </div>

          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white leading-[0.9] uppercase">
             Where are you <br /> 
             <span className="text-primary italic animate-in fade-in slide-in-from-right-12 duration-1000">Going today?</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl font-bold italic text-white/60 tracking-tight leading-relaxed">
             Discover authentic cities and connect with <br className="hidden md:block" />
             top-rated local guides in real-time.
          </p>
        </motion.div>

        {/* Search Box Container */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3, duration: 0.6 }}
           className="mx-auto max-w-3xl"
        >
           <div className="relative group p-1.5 md:p-2 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10 hover:border-white/30">
              <div className="flex flex-col md:flex-row items-center gap-2">
                 <div className="flex-1 w-full flex items-center px-4 gap-4 h-14 md:h-16">
                    <MapPin className="h-6 w-6 text-primary drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <Input
                      value={query}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search city or destination_node"
                      className="flex-1 h-full bg-transparent border-none text-white font-black italic text-lg placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                 </div>
                 
                 <Button 
                    onClick={handleSubmit} 
                    className="w-full md:w-48 h-14 md:h-16 rounded-2xl bg-primary text-white font-black italic uppercase tracking-widest text-sm shadow-xl shadow-primary/30 transition-all hover:scale-[1.03] active:scale-95 gap-3"
                 >
                    <Search className="h-5 w-5" />
                    Explore_Now
                 </Button>
              </div>

              {/* Enhanced Dropdown */}
              {showDropdown && results.length > 0 && (
                <div className="absolute z-50 mt-4 w-full left-0 rounded-2xl bg-background/80 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  {results.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className="flex w-full items-center gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                         <Compass className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black italic text-white uppercase tracking-tight text-sm">{city.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                          {city.country}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
           </div>
        </motion.div>

        {/* Hero Footer Stats */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8, duration: 1 }}
           className="pt-12 flex flex-wrap items-center justify-center gap-12 md:gap-20"
        >
           {[
              { label: "Verified Guides", val: "500+", icon: ShieldCheck },
              { label: "Total Bookings", val: "12K", icon: Users },
              { label: "Top Rated", val: "4.9/5", icon: Star }
           ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group">
                 <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110 shadow-sm shadow-primary/10">
                    <stat.icon className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col items-start">
                    <span className="text-xl font-black italic tracking-tighter text-white leading-none">{stat.val}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mt-1">{stat.label}</span>
                 </div>
              </div>
           ))}
        </motion.div>
      </div>
      
      {/* Decorative Bottom Mesh Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
