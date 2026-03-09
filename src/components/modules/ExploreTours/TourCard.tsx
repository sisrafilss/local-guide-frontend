'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Users, Star, ArrowUpRight, Compass } from 'lucide-react';
import Link from 'next/link';
import Meta from './Meta';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type Tour = {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMin: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  city: string;
  imageURL?: string;
};

function TourCard({ tour }: { tour: Tour }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden rounded-[2rem] border-2 border-border/40 bg-card/60 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20">
        {/* Prestige Category Badge */}
        <div className="absolute top-4 right-4 z-20">
           <Badge variant="outline" className="bg-background/80 backdrop-blur-xl border-white/20 text-[9px] font-black uppercase tracking-[0.2em] h-7 px-4 rounded-full shadow-xl italic transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary">
              {tour.category}
           </Badge>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 z-10 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity opacity-100" />

        {/* Image Substrate */}
        <div className="relative h-64 w-full bg-muted overflow-hidden">
          <Image
            src={tour.imageURL || '/images/placeholder-listing.png'}
            alt={tour.title}
            fill
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-white/20 rounded-tl-[2rem] m-4" />
        </div>

        <CardContent className="relative z-20 space-y-6 px-7 pb-8 pt-4">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-xl font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors duration-300 italic pr-6 group-hover:translate-x-1 transition-transform">
               {tour.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
               <MapPin className="h-3 w-3 text-primary/60" />
               {tour.city}
               <span className="h-1 w-1 rounded-full bg-primary/40 mx-1" />
               Node_ID.{tour.id.slice(0, 4)}
            </div>
          </div>

          <p className="line-clamp-2 text-[11px] font-bold italic text-muted-foreground leading-relaxed leading-[1.3] opacity-80">
            {tour.description}
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-border/20 pt-5">
             <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary/60 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                   <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black italic tracking-tighter leading-none">{tour.durationMin}m</span>
                   <span className="text-[8px] font-bold uppercase text-muted-foreground/50 tracking-widest">Tempo</span>
                </div>
             </div>
             
             <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary/60 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                   <Users className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black italic tracking-tighter leading-none">{tour.maxGroupSize} Max</span>
                   <span className="text-[8px] font-bold uppercase text-muted-foreground/50 tracking-widest">Buffer</span>
                </div>
             </div>

             <div className="col-span-2 flex items-center justify-between mt-2 pt-4 border-t border-border/10">
                <div className="flex flex-col">
                   <span className="text-2xl font-black italic tracking-tighter text-foreground leading-none">৳ {tour.price}</span>
                   <span className="text-[8px] font-black uppercase text-primary/60 tracking-[0.3em] mt-1 italic">Flat_Rate</span>
                </div>
                <Link href={`/explore-tours/${tour.id}`} className="group/btn">
                   <Button className="h-12 w-12 rounded-2xl bg-primary shadow-xl shadow-primary/20 p-0 hover:scale-110 active:scale-90 transition-all">
                      <ArrowUpRight className="h-5 w-5" />
                   </Button>
                </Link>
             </div>
          </div>
        </CardContent>
        
        {/* Dynamic Hover Substrate Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </motion.div>
  );
}

export default TourCard;
