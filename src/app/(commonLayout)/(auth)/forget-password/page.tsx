'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Compass, Mail, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

const ForgetPasswordPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background px-6 py-12 transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse opacity-50 dark:opacity-100" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse delay-700 opacity-30 dark:opacity-100" />
      </div>

      <ScrollReveal variant="blur-up" duration={0.8} className="w-full max-w-lg relative z-10">
        <div className="w-full backdrop-blur-3xl bg-card/30 border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-10">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-6">
            <Link href="/" className="group flex flex-col items-center gap-4 transition-all active:scale-95">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                  Forget <span className="text-primary">Password</span>
                </h2>
                <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase opacity-60">
                   Enter your email to reset your password
                </p>
              </div>
            </Link>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 group">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary/60" />
                  Email
               </label>
               <Input
                 type="email"
                 placeholder="m@example.com"
                 className="h-14 bg-muted/10 border-border focus:border-primary/50 text-foreground font-black italic text-sm rounded-2xl px-5 transition-all outline-none"
               />
               <p className="text-[9px] font-bold text-muted-foreground opacity-40 uppercase tracking-widest px-1 mt-2">
                 * You will receive a secure transmission link if the record exists.
               </p>
            </div>

            <Button 
                type="submit" 
                className="w-full h-16 rounded-[1.25rem] bg-primary text-primary-foreground font-black italic uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-4"
            >
                Send
                <Send className="h-5 w-5" />
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest italic hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3" />
              Return to Login
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-20">
         <span className="text-[9px] font-black uppercase tracking-[0.5em] text-foreground italic">Localized Intelligence &bull; Verified Experiences</span>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
