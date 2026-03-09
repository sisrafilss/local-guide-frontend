'use client';

import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, MessageSquare, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
    }, 1500);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-24 px-6 lg:px-12">
      {/* Decorative Background Mesh */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 opacity-60" />

      <div className="mx-auto max-w-7xl space-y-24 flex flex-col items-center">
        {/* ================= Header ================= */}
        <ScrollReveal variant="blur-up">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
             <div className="flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Contact_Logic</span>
                <span className="h-[2px] w-8 bg-primary/40 md:w-12" />
             </div>
             <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
                Get in <br />
                <span className="text-primary italic animate-in fade-in slide-in-from-right-12 duration-1000">Touch today?</span>
             </h1>
             <p className="mx-auto max-w-2xl text-lg font-bold italic text-muted-foreground/60 tracking-tight leading-relaxed">
               Have questions, feedback, or partnership ideas? Our expert buffer is ready to respond in real-time.
             </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5 w-full">
          {/* ================= Contact Info / Status Columns ================= */}
          <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
            <ScrollStagger className="space-y-6">
              {[
                { icon: Mail, label: "Electronic_Mail", val: "support@localguide.com" },
                { icon: Phone, label: "Voice_Channel", val: "+880 1XXX-XXXXXX" },
                { icon: MapPin, label: "Base_Deployment", val: "Dhaka, Bangladesh" }
              ].map((info, i) => (
                <ScrollStaggerItem key={i} variant="fade-right">
                  <div className="flex items-start gap-4 p-5 rounded-[2rem] bg-muted/20 border-2 border-border/40 hover:bg-muted/40 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-primary/5 blur-2xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                       <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1 opacity-60 italic">{info.label}</span>
                       <span className="text-sm font-black italic text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{info.val}</span>
                    </div>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>

            <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-primary/10 shadow-xl space-y-6 relative overflow-hidden group">
               <MessageSquare className="absolute -top-12 -right-12 h-44 w-44 text-primary opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-1000" strokeWidth={1} />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Support_Status.live</span>
                  </div>
                  <h3 className="text-xl font-black italic tracking-tighter text-foreground uppercase">Real-Time_Logic</h3>
                  <p className="text-xs font-bold italic text-muted-foreground/60 leading-relaxed uppercase tracking-tight max-w-[200px]">
                    Average response protocol within 24 hours of initialization.
                  </p>
               </div>
            </div>
          </div>

          {/* ================= Contact Form / Submission Log ================= */}
          <div className="lg:col-span-3">
            <ScrollReveal variant="fade-left">
              <Card className="rounded-[3rem] border-2 border-border/40 bg-card/40 backdrop-blur-3xl shadow-2xl p-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                
                <CardContent className="p-10 space-y-10">
                  <div className="space-y-2">
                     <h2 className="text-3xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                        Transmitter_Portal
                     </h2>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] opacity-40">Message_Initialization_Log.v1</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                             <UserCircle2 className="h-3 w-3 text-primary/60" />
                             Subject_Identity
                          </label>
                          <Input 
                            placeholder="Your name" 
                            required 
                            className="h-14 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-black text-sm italic rounded-2xl px-6 transition-all placeholder:text-muted-foreground/30 capitalize"
                          />
                       </div>
                       <div className="space-y-2.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                             <Mail className="h-3 w-3 text-primary/60" />
                             Contact_Email
                          </label>
                          <Input 
                            type="email" 
                            placeholder="Your email address" 
                            required 
                            className="h-14 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-black text-sm italic rounded-2xl px-6 transition-all placeholder:text-muted-foreground/30"
                          />
                       </div>
                    </div>

                    <div className="space-y-2.5">
                       <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                          <MessageSquare className="h-3 w-3 text-primary/60" />
                          Message_Payload
                       </label>
                       <Textarea 
                         placeholder="Enter your message details here..." 
                         rows={5} 
                         required 
                         className="bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-bold text-sm italic rounded-[2rem] px-6 py-5 resize-none scrollbar-hide placeholder:text-muted-foreground/30"
                       />
                    </div>

                    <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
                       <Button
                         type="submit"
                         disabled={isSubmitting}
                         className="w-full md:w-64 h-16 rounded-[1.5rem] font-black italic uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 group relative overflow-hidden active:scale-95 transition-all"
                       >
                         <div className="relative z-10 flex items-center gap-3">
                            {isSubmitting ? (
                              <>
                                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Protocol_Active
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Initialize_Transmission
                              </>
                            )}
                         </div>
                       </Button>
                       
                       <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-500/40" />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">Data_Encrypted_Link</span>
                       </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Futuristic Floating Detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-20 rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-20 -rotate-45 pointer-events-none" />
    </section>
  );
}
