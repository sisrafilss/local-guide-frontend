'use client';

import { CalendarCheck, Search, Smile, ArrowRight, Zap, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-32 bg-background/50 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center space-y-4 mb-24">
           <div className="flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Operational_Logic</span>
              <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
           </div>
           <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-none">
              How It <span className="text-primary italic">Works</span>
           </h2>
           <p className="max-w-xl mx-auto text-sm font-bold italic text-muted-foreground/60 tracking-tight italic">
              Streamlining the connection between world-class guides and curious explorers.
           </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px border-t-2 border-dashed border-border/20 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Circle Substrate */}
                <div className="relative h-28 w-28 flex items-center justify-center mb-8">
                   <div className="absolute inset-0 bg-background border-2 border-border/40 rounded-[2rem] rotate-45 group-hover:rotate-90 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-700 shadow-xl" />
                   
                   <div className="relative h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8" />
                   </div>
                   
                   {/* Step Number Badge */}
                   <div className="absolute -top-2 -right-2 h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black italic text-sm shadow-xl shadow-primary/30 border-4 border-background group-hover:scale-110 transition-transform">
                      0{index + 1}
                   </div>
                </div>

                <div className="space-y-3 px-4">
                  <h3 className="text-xl font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors italic">
                     {step.title}
                  </h3>
                  <p className="text-xs font-bold italic text-muted-foreground opacity-60 leading-relaxed uppercase tracking-tight max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Technical Micro-Label */}
                <div className="mt-8 flex items-center gap-2 opacity-10 group-hover:opacity-100 transition-all group-hover:scale-110">
                   <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Process_Optimization</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
