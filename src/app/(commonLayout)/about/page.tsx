import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/animations/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, Users, Target, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 opacity-60" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl space-y-32">
        {/* ================= Header ================= */}
        <ScrollReveal variant="blur-up">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
             <div className="flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">About Us</span>
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
             </div>
             <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                Authenticity <br />
                <span className="text-primary italic animate-pulse">Redefined</span>
             </h1>
             <p className="mx-auto max-w-2xl text-lg font-bold italic text-muted-foreground/60 tracking-tight leading-relaxed">
               Connecting travelers with hand-picked local experts to discover the heart of every city beyond the binary.
             </p>
          </div>
        </ScrollReveal>

        {/* ================= Mission ================= */}
        <ScrollReveal variant="fade-up" amount={0.3}>
          <Card className="relative overflow-hidden rounded-[3rem] border-2 border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl">
            <CardContent className="grid gap-12 p-8 md:p-16 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                       Our <span className="text-primary italic">Mission</span>
                    </h2>
                    <p className="text-lg font-bold italic text-muted-foreground tracking-tight leading-relaxed max-w-md">
                      We believe the best way to explore a destination is through the eyes of those who call it home.
                    </p>
                 </div>
                 
                 <div className="space-y-6 text-sm font-medium text-muted-foreground/80 leading-relaxed italic border-l-2 border-primary/20 pl-6">
                    <p>
                      Our mission is to empower local guides while helping curious explorers discover cities beyond typical tourist paths. We provide the infrastructure for authentic human connection.
                    </p>
                    <p>
                      By digitizing local expertise, we create a sustainable ecosystem where culture is preserved and experiences are personalized in real-time.
                    </p>
                 </div>
              </div>

              <div className="relative h-64 md:h-96 w-full rounded-[2.5rem] bg-muted overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/40 to-transparent" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Compass className="h-32 w-32 text-primary opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" strokeWidth={1} />
                 </div>
                 {/* Decorative Accent */}
                 <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-white/10 shadow-xl self-start">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">Verified</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* ================= Values ================= */}
        <div className="space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic leading-none">Our Values</h2>
              <p className="text-3xl font-black italic tracking-tighter uppercase text-foreground">The Local Guide Standard</p>
           </div>

           <ScrollStagger className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Target, title: "Authentic Experiences", desc: "Discover cities through real local perspectives.", label: "Verified" },
                { icon: Users, title: "Community Driven", desc: "Built for local experts and world explorers alike.", label: "Network" },
                { icon: ShieldCheck, title: "Quality & Trust", desc: "Hand-picked guides and transparent reviews.", label: "Secure" }
              ].map((value, idx) => (
                <ScrollStaggerItem key={idx} variant="fade-up">
                  <Card className="group relative overflow-hidden rounded-[2.5rem] border-2 border-border/40 bg-card/40 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20 h-full">
                    <CardContent className="space-y-6 pt-10 pb-12 px-8 text-center flex flex-col items-center">
                       <div className="relative h-16 w-16 flex items-center justify-center">
                          <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-12 group-hover:rotate-45 group-hover:bg-primary transition-all duration-500" />
                          <value.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors relative z-10" />
                       </div>
                       
                       <div className="space-y-3">
                         <h3 className="text-lg font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors">
                            {value.title}
                         </h3>
                         <p className="text-xs font-bold italic text-muted-foreground leading-relaxed leading-[1.3] opacity-60">
                           {value.desc}
                         </p>
                       </div>

                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">{value.label}</span>
                       </div>
                    </CardContent>
                  </Card>
                </ScrollStaggerItem>
              ))}
           </ScrollStagger>
        </div>

        {/* ================= Vision Section ================= */}
        <ScrollReveal variant="zoom-in" className="mx-auto max-w-4xl text-center pb-12">
           <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 shadow-2xl relative overflow-hidden group">
              <Heart className="absolute -top-12 -right-12 h-64 w-64 text-primary opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-1000" strokeWidth={1} />
              
              <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                    Ready to <br />
                    <span className="text-primary italic">Connect today?</span>
                 </h2>
                 <p className="text-sm font-bold italic text-muted-foreground/60 max-w-lg mx-auto tracking-tight leading-relaxed">
                    Join a global network of local enthusiasts and travelers committed to discovering the soul of our world.
                 </p>
                 <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.4em] text-primary italic uppercase underline underline-offset-8 decoration-primary/20">
                    Discover The Unseen
                 </div>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
