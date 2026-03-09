import { ScrollReveal } from '@/components/animations/ScrollReveal';
import LoginForm from '@/components/LoginForm';
import { Compass } from 'lucide-react';
import Link from 'next/link';

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background px-6 py-12 transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse opacity-50 dark:opacity-100" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse delay-700 opacity-30 dark:opacity-100" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full opacity-20 dark:opacity-100" />
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
                  Welcome <span className="text-primary">Back</span>
                </h2>
                <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase opacity-60">
                  Enter your credentials to access your account
                </p>
              </div>
            </Link>
          </div>

          <div className="relative group">
            <LoginForm redirect={params.redirect} />
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest italic">
              New to Local Guide?{' '}
              <Link href="/register" className="text-primary hover:text-foreground transition-colors underline underline-offset-4 decoration-primary/40">
                Sign up
              </Link>
            </p>
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

export default LoginPage;
