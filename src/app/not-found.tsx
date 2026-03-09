import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Home, Search, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background px-6 transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[180px] rounded-full opacity-30 dark:opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/10 blur-[150px] rounded-full opacity-20 dark:opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        {/* Error Code */}
        <div className="relative inline-block">
           <h1 className="text-[12rem] md:text-[20rem] font-black italic tracking-tighter text-foreground/5 leading-none select-none">
              404
           </h1>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 md:p-10 rounded-[3rem] bg-card/30 backdrop-blur-3xl border border-border shadow-2xl rotate-3">
                 <AlertTriangle className="h-16 w-16 md:h-24 md:w-24 text-primary animate-bounce shadow-[0_0_50px_rgba(19,127,236,0.3)]" />
              </div>
           </div>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-12 bg-primary/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Lost in Space</span>
             <div className="h-px w-12 bg-primary/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-foreground uppercase leading-[0.9]">
             Node <span className="text-primary">Not Found</span>
          </h2>
          <p className="text-lg md:text-xl font-bold italic text-muted-foreground tracking-tight leading-relaxed">
             The coordinates you followed seem to lead into a void. <br className="hidden md:block" />
             Our local guides are searching for this path, but for now, you should head back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Button asChild variant="outline" className="h-16 px-10 rounded-2xl font-black italic uppercase tracking-widest text-xs border-2 border-border bg-card/30 text-foreground hover:bg-foreground hover:text-background transition-all gap-3 active:scale-95">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Preceding Node
            </Link>
          </Button>
          
          <Button asChild className="h-16 px-10 rounded-2xl font-black italic uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all gap-3 bg-primary text-primary-foreground cursor-pointer">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Home Page
            </Link>
          </Button>
        </div>

        {/* Global Footer Decoration */}
        <div className="pt-24 opacity-10 flex items-center justify-center gap-6 select-none">
           <Compass className="h-5 w-5" />
           <div className="h-px w-24 bg-foreground" />
           <span className="text-[8px] font-black uppercase tracking-[1em] text-foreground">Local Guide OS</span>
           <div className="h-px w-24 bg-foreground" />
        </div>
      </div>
    </div>
  );
}
