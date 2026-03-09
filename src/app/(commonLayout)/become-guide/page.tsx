import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  type LucideIcon,
  MapPin,
  Smile,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Globe,
  Heart,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BecomeGuidePage() {
  return (
    <main className="relative overflow-hidden bg-background pb-32">
      {/* Decorative Brand Overlay Elements */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 opacity-60" />

      {/* ================= Hero Section ================= */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden">
        <ScrollReveal variant="blur-up">
          <div className="mx-auto max-w-5xl text-center space-y-8">
             <div className="flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Access_Portal.apply</span>
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
             </div>
             
             <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-foreground uppercase leading-[0.85]">
                Become a <br />
                <span className="text-primary italic animate-in fade-in slide-in-from-right-12 duration-1000">Local Guide</span>
             </h1>
             
             <p className="mx-auto max-w-2xl text-xl font-bold italic text-muted-foreground/60 tracking-tight leading-relaxed">
               Share your local knowledge, connect with travelers worldwide, and build a sustainable touring business.
             </p>

             <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
               <Button size="lg" className="h-16 px-10 rounded-2xl font-black italic uppercase tracking-widest text-sm shadow-xl shadow-primary/30 group relative overflow-hidden transition-all hover:scale-[1.03] active:scale-95" asChild>
                 <Link href="/become-guide/apply">
                   Apply_Now_Protocol
                   <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </Button>
               <Button size="lg" variant="ghost" className="h-16 px-10 rounded-2xl font-black italic uppercase tracking-widest text-xs gap-3 border border-border/20 text-muted-foreground/60 hover:text-foreground transition-all">
                  Documentation_Log
               </Button>
             </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= Why Become a Guide ================= */}
      <section className="py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-4 mb-20">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic leading-none">Guide_Incentive.log</h2>
               <p className="text-3xl font-black italic tracking-tighter uppercase text-foreground">Strategic Advantages</p>
            </div>
          </ScrollReveal>

          <ScrollStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Briefcase, title: "Earn on Your Schedule", desc: "Create tours, set your price, and guide when it suits you.", label: "Monetized_Log" },
              { icon: Globe, title: "Global Scope", desc: "Connect with travelers from different cultures.", label: "Network_Buffer" },
              { icon: MapPin, title: "City Alpha", desc: "Share hidden gems and authentic local experiences.", label: "Verified_Nodes" }
            ].map((item, idx) => (
              <ScrollStaggerItem key={idx} variant="fade-up">
                <InfoCard {...item} />
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ================= Who Can Apply (Status Section) ================= */}
      <section className="py-32 px-6 lg:px-12 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-4 mb-20">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic leading-none">Subject_Requirement.v1</h2>
               <p className="text-3xl font-black italic tracking-tighter uppercase text-foreground">Who Can Deploy?</p>
            </div>
          </ScrollReveal>

          <ScrollStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, title: "Local Experts", desc: "You know your city well and love sharing stories." },
              { icon: Smile, title: "Friendly Logic", desc: "You enjoy meeting and guiding groups." },
              { icon: CalendarCheck, title: "Reliability_Node", desc: "You respect time and project commitments." },
              { icon: Zap, title: "No Cap_In", desc: "First-time guides are welcome to apply." }
            ].map((item, idx) => (
              <ScrollStaggerItem key={idx} variant="pop">
                <StatusCard {...item} />
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ================= How It Works (Visual Process) ================= */}
      <section className="py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-4 mb-24">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic leading-none">Operational_Protocol</h2>
               <p className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-foreground">Deployment <span className="text-primary italic">Process</span></p>
            </div>
          </ScrollReveal>

          <div className="grid gap-16 md:grid-cols-3 relative">
            {/* Connector Line Motif */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px border-t-2 border-dashed border-border/20 z-0" />
            
            {[
              { step: "01", title: "Apply as a Guide", desc: "Fill out a simple application with your technical details." },
              { step: "02", title: "Create Listings", desc: "Add tours with price, duration, and metadata description." },
              { step: "03", title: "Start Guiding", desc: "Accept bookings and host hand-picked city experiences." }
            ].map((step, idx) => (
              <ScrollStaggerItem key={idx} variant="fade-up" className="z-10">
                <Step {...step} />
              </ScrollStaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Benefits Grid ================= */}
      <section className="py-32 px-6 lg:px-12 bg-primary/[0.03] border-y border-border/10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fade-up">
             <div className="text-center space-y-4 mb-20">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic leading-none">Guide_Perks.buffer</h2>
                <p className="text-3xl font-black italic tracking-tighter uppercase text-foreground">Protocol Benefits</p>
             </div>
          </ScrollReveal>

          <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "No upfront Fees_Node", "Full Price_Logic Control", "Flexible Protocol Schedule", 
              "Secure Payment_Gate", "Admin_Layer Support", "Personal_Brand Growth"
            ].map((benefit, idx) => (
              <ScrollStaggerItem key={idx} variant="pop">
                <Benefit text={benefit} />
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ================= Final CTA Section ================= */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <ScrollReveal variant="zoom-in" className="mx-auto max-w-4xl text-center flex flex-col items-center">
           <div className="space-y-12 w-full p-12 md:p-20 rounded-[3rem] bg-background border-2 border-border/40 shadow-2xl relative group">
              <Sparkles className="absolute -top-12 -left-12 h-44 w-44 text-primary opacity-5 animate-pulse group-hover:scale-110 -rotate-12 transition-transform duration-1000" strokeWidth={1} />
              <div className="space-y-6">
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                   Ready to Start <br />
                   <span className="text-primary italic animate-pulse">Guiding today?</span>
                </h2>
                <p className="text-lg font-bold italic text-muted-foreground/60 max-w-xl mx-auto tracking-tight leading-relaxed">
                  Join our verified community of local guides and turn your hand-picked knowledge into profit.
                </p>
              </div>

              <div className="pt-4">
                <Button size="lg" className="h-16 px-12 rounded-2xl font-black italic uppercase tracking-widest text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all gap-4" asChild>
                  <Link href="/become-guide/apply">
                    Become_a_Guide
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
           </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

/* ---------------- Small Reusable Components (Refined) ---------------- */

function InfoCard({ icon: Icon, title, desc, label }: any) {
  return (
    <Card className="group relative overflow-hidden rounded-[2.5rem] border-2 border-border/40 bg-card/40 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20 h-full">
      <CardContent className="space-y-6 pt-10 pb-12 px-8 text-center flex flex-col items-center">
        <div className="relative h-16 w-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-12 group-hover:rotate-45 group-hover:bg-primary transition-all duration-500" />
          <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors relative z-10" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-xs font-bold italic text-muted-foreground leading-relaxed leading-[1.3] opacity-60 px-2">{desc}</p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-[2rem] border-2 border-border/20 bg-background/50 backdrop-blur-md hover:bg-background hover:border-primary/20 transition-all group shadow-sm">
      <div className="h-14 w-14 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center text-primary group-hover:scale-110 shadow-inner">
         <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-2 text-center">
         <h3 className="text-sm font-black italic tracking-tighter text-foreground uppercase">{title}</h3>
         <p className="text-[10px] font-bold text-muted-foreground/60 leading-relaxed italic pr-1">{desc}</p>
      </div>
    </div>
  );
}

function Step({ step, title, desc }: any) {
  return (
    <div className="relative flex flex-col items-center text-center group">
       <div className="relative h-28 w-28 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-background border-2 border-border/40 rounded-[2rem] rotate-45 group-hover:rotate-90 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-700 shadow-xl" />
          <span className="relative text-3xl font-black italic tracking-tighter text-primary group-hover:scale-110 transition-transform">
             {step}
          </span>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
       </div>

       <div className="space-y-3 px-4">
         <h3 className="text-xl font-black italic tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors italic">{title}</h3>
         <p className="text-xs font-bold italic text-muted-foreground opacity-60 leading-relaxed uppercase tracking-tight max-w-[180px] mx-auto opacity-70 italic">{desc}</p>
       </div>
    </div>
  );
}

function Benefit({ text }: any) {
  return (
    <div className="group relative rounded-2xl border-2 border-border/40 bg-card/40 backdrop-blur-md p-6 text-center shadow-lg transition-all hover:border-primary/20 hover:bg-card overflow-hidden">
       <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
       <div className="relative z-10 flex items-center justify-center gap-3">
          <BadgeCheck className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] italic text-foreground group-hover:text-primary transition-colors pr-2">
             {text}
          </span>
       </div>
    </div>
  );
}
