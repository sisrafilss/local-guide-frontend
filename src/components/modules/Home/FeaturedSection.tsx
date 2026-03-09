'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, UserCheck, ShieldCheck, Map, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import TourCard from '../ExploreTours/TourCard';
import { motion } from 'framer-motion';

type Guide = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  imageUrl: string;
};

const TOP_GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Rahim Ahmed',
    city: 'Cox’s Bazar',
    rating: 4.9,
    reviews: 120,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Sadia Khan',
    city: 'Sylhet',
    rating: 4.8,
    reviews: 98,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Tanvir Hasan',
    city: 'Dhaka',
    rating: 4.7,
    reviews: 85,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
];

export default function FeaturedSection({
  featuredTours,
}: {
  featuredTours: any;
}) {
  return (
    <section className="w-full px-6 py-24 lg:px-12 bg-background/50">
      <div className="mx-auto max-w-7xl space-y-32">
        {/* ================= Featured Tours ================= */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-primary/60" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic leading-none">Featured Tours</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                  Featured <br />
                  <span className="text-primary italic">Tours</span>
               </h2>
               <p className="text-sm font-bold italic text-muted-foreground/60 max-w-md tracking-tight leading-none italic">
                  Explore hand-picked authentic experiences from our premier local experts.
               </p>
            </div>
            <Link href="/explore-tours" passHref>
               <Button variant="ghost" className="h-16 px-8 rounded-2xl group border border-border/10 bg-muted/20 hover:bg-primary transition-all active:scale-95">
                  <div className="flex items-center gap-4 text-sm font-black italic tracking-widest uppercase group-hover:text-white">
                     View All Tours
                     <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-black/20 transition-all">
                        <ArrowRight className="h-4 w-4" />
                     </div>
                  </div>
               </Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTours?.data?.length ? (
              featuredTours?.data?.map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-border/40 rounded-[2.5rem] bg-muted/10 space-y-4">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mx-auto opacity-40">
                    <LayoutGrid className="h-6 w-6" />
                 </div>
                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic opacity-50">No tours found</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= Top Rated Guides ================= */}
        <div className="space-y-12 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-primary/60" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic leading-none">Popular Destinations</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                  Top-Rated <br />
                  <span className="text-primary italic">Expert Guides</span>
               </h2>
               <p className="text-sm font-bold italic text-muted-foreground/60 max-w-md tracking-tight leading-none italic">
                  Connect with verified locals who turn journeys into unforgettable stories.
               </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {TOP_GUIDES.map((guide, i) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="group relative overflow-hidden rounded-[2rem] border-2 border-border/40 bg-card/40 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20 p-6 md:p-8">
                  <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative h-24 w-24 p-1.5 rounded-full bg-gradient-to-br from-primary via-primary/40 to-transparent shadow-xl group-hover:scale-105 transition-transform duration-500">
                      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-background">
                        <Image
                          src={guide.imageUrl}
                          alt={guide.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Status Pulse */}
                      <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background shadow-lg shadow-emerald-500/50 scale-animation" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col items-center gap-1">
                         <h3 className="text-xl font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors">
                           {guide.name}
                         </h3>
                         <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none opacity-60">
                            <Map className="h-2.5 w-2.5" />
                            {guide.city}
                         </div>
                      </div>

                      <div className="pt-4 flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                           <div className="flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                              <Star className="h-3 w-3 fill-primary text-primary" strokeWidth={0} />
                              <span className="text-xs font-black italic">{guide.rating}</span>
                           </div>
                           <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">Score</span>
                        </div>
                        <div className="h-8 w-px bg-border/40" />
                        <div className="flex flex-col items-center">
                           <span className="text-xs font-black italic tracking-tighter">{guide.reviews}</span>
                           <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">Reviews</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full h-12 rounded-xl group/btn border-border/40 bg-muted/20 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest italic gap-2">
                       Connect
                       <ShieldCheck className="h-4 w-4 opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                    </Button>
                  </div>
                  
                  {/* Decorative Background Accent */}
                  <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
