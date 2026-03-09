import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowUpRight, Compass, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const cities = [
  { name: 'Dhaka', tours: 12, img: 'https://images.unsplash.com/photo-1590603740183-980e7f6920eb?w=600&h=800&fit=crop' },
  { name: 'Chattogram', tours: 8, img: 'https://images.unsplash.com/photo-1622213199391-21d763955685?w=600&h=800&fit=crop' },
  { name: 'Sylhet', tours: 6, img: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&h=800&fit=crop' },
  { name: 'Cox’s Bazar', tours: 10, img: 'https://images.unsplash.com/photo-1549646401-496696d5108b?w=600&h=800&fit=crop' },
];

const PopularCitiesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border/20 pb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-primary/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic leading-none">Global_Nodes</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                Popular <br />
                <span className="text-primary italic">Destinations</span>
             </h2>
             <p className="text-sm font-bold italic text-muted-foreground/60 max-w-md tracking-tight leading-none italic">
                Explore our most active city buffers and connect with verified local experts.
             </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Link key={city.name} href={`/explore-tours?searchTerm=${city.name}`} className="group relative">
               <Card className="h-[450px] overflow-hidden rounded-[2.5rem] border-2 border-border/20 bg-muted/40 shadow-xl transition-all hover:shadow-2xl hover:border-primary/40 group-hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                     src={city.img}
                     alt={city.name}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  
                  <CardContent className="absolute inset-x-0 bottom-0 p-8 space-y-4">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="h-6 w-6 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <MapPin className="h-3 w-3" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-primary italic underline underline-offset-4 decoration-primary/40">Active_Node</span>
                        </div>
                        <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase group-hover:translate-x-1 transition-transform">{city.name}</h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] italic">
                          {city.tours} Verified Layers
                        </p>
                     </div>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60 italic group-hover:text-white transition-colors">Access_City</span>
                        <div className="h-10 w-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all group-hover:bg-primary group-hover:border-primary">
                           <ArrowUpRight className="h-4 w-4" />
                        </div>
                     </div>
                  </CardContent>
                  
                  {/* Interactive Status Indicator */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     <span className="text-[8px] font-black uppercase tracking-widest text-white italic">Live_Deployment</span>
                  </div>
               </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCitiesSection;
