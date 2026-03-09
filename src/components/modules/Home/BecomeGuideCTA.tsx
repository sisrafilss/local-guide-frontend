'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BadgeCheck, Map, Users, CheckCircle2, Globe, TrendingUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BecomeGuideCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full px-6 py-24 lg:px-12 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <Card className="overflow-hidden rounded-[2.5rem] border-2 border-border/40 bg-background shadow-2xl">
          <CardContent className="grid gap-0 p-0 lg:grid-cols-5 flex-col-reverse lg:flex-row">
            
            {/* ================= Text Content ================= */}
            <div className="lg:col-span-3 p-8 md:p-16 lg:p-20 space-y-10 flex flex-col justify-center">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-primary/60" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic leading-none">Join the community</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-[0.95]">
                    Become a <br />
                    <span className="text-primary italic">Local Guide</span>
                 </h2>
                 <p className="text-lg font-bold italic text-muted-foreground max-w-xl tracking-tight leading-relaxed mt-4">
                    Share your unique local knowledge, connect with global travelers, and build your own touring business in real-time.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { icon: TrendingUp, label: "Earn Rewards", sub: "Monetize your passion" },
                   { icon: Globe, label: "Global Scope", sub: "Meet travelers worldwide" },
                   { icon: Map, label: "City Impact", sub: "Showcase your culture" }
                 ].map((item, i) => (
                    <div key={i} className="space-y-3 group">
                       <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <item.icon className="h-5 w-5" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-widest italic">{item.label}</p>
                          <p className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase">{item.sub}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-8">
                <Button size="lg" className="h-16 px-10 rounded-2xl font-black italic uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all gap-3" asChild>
                  <Link href="/become-guide/apply">
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ================= Visual Content ================= */}
            <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-full overflow-hidden group">
              <Image
                src="/images/hero/become-guide.png"
                alt="Become a Local Guide"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-l" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/20 shadow-2xl">
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white italic opacity-40 mb-2 underline decoration-primary underline-offset-4">Verified Status</span>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                             <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                             <p className="text-xs font-black text-white italic uppercase tracking-widest">Expert Badge</p>
                             <p className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">Verified Professional</p>
                          </div>
                       </div>
                       <BadgeCheck className="h-10 w-10 text-primary opacity-20" strokeWidth={1} />
                    </div>
                 </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute top-8 right-8 h-12 w-12 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl" />
              <div className="absolute bottom-8 left-8 h-12 w-12 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl lg:hidden" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
