'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ShieldCheck, Users, Zap, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-32 bg-muted/10 relative overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
           <div className="flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Our Values</span>
              <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
           </div>
           <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-none">
              Why <span className="text-primary italic">Choose Us</span>
           </h2>
           <p className="max-w-xl mx-auto text-sm font-bold italic text-muted-foreground/60 tracking-tight italic">
              Delivering high-integrity travel experiences powered by exclusive local data.
           </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="group relative overflow-hidden rounded-[2.5rem] border-2 border-border/40 bg-card/60 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20 p-4">
                <CardContent className="flex flex-col items-center gap-6 p-8 text-center relative z-10">
                  <div className="relative h-20 w-20 flex items-center justify-center">
                     <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-12 group-hover:rotate-45 group-hover:bg-primary transition-all duration-500" />
                     <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors relative z-10" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors italic">
                       {item.title}
                    </h3>
                    <p className="text-xs font-bold italic text-muted-foreground/80 leading-relaxed tracking-tight opacity-70">
                      {item.description}
                    </p>
                  </div>

                   <div className="pt-4 flex items-center justify-center gap-2 opacity-10 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Priority</span>
                      <Zap className="h-3 w-3 text-primary" />
                   </div>
                </CardContent>
                
                {/* Decorative Bottom Shadow Stripe */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-primary/20 group-hover:bg-primary transition-colors" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
