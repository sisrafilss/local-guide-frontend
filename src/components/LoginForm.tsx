'use client';

import { loginUser } from '@/services/auth/loginUser';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import InputFieldError from './shared/InputFieldError';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Lock, LogIn, ShieldAlert, User, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleDemoLogin = (role: 'tourist' | 'guide' | 'admin') => {
    const demoCredentials = {
      tourist: { email: 'mamunali@gmail.com', password: '123456' },
      guide: { email: 'ashraful.islam@gmail.com', password: '123456' },
      admin: { email: 'admin@gmail.com', password: '123456' },
    };
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <form action={formAction} className="space-y-8">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      {/* Demo Suite - Now at the Top for Visibility */}
      <div className="space-y-4 pb-2 text-foreground">
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-primary/20" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Quick Access Demo</span>
           <div className="h-px flex-1 bg-primary/20" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { role: 'tourist' as const, icon: User, label: 'Tourist', color: 'from-blue-500/10 to-transparent' },
            { role: 'guide' as const, icon: Star, label: 'Guide', color: 'from-purple-500/10 to-transparent' },
            { role: 'admin' as const, icon: ShieldAlert, label: 'Admin', color: 'from-amber-500/10 to-transparent' }
          ].map((demo) => (
            <button
              key={demo.role}
              type="button"
              onClick={() => handleDemoLogin(demo.role)}
              className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] bg-muted/20 hover:bg-muted/30 border border-border hover:border-primary/50 transition-all gap-2 group relative overflow-hidden shadow-sm hover:shadow-primary/5 active:scale-95`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <demo.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground relative z-10">{demo.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2 group">
           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
              <Mail className="h-3 w-3 text-primary/60" />
              Email
           </label>
           <div className="relative group/input">
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                className="h-14 bg-muted/10 border-border focus:border-primary/50 text-foreground font-black italic text-sm rounded-2xl px-5 transition-all outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity">
                 <ArrowRight className="h-4 w-4 text-primary" />
              </div>
           </div>
           <InputFieldError field="email" state={state} />
        </div>

        {/* Password Field */}
        <div className="space-y-2 group">
           <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                 <Lock className="h-3 w-3 text-primary/60" />
                 Password
              </label>
              <Link href="/forget-password" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors">
                Forgot password?
              </Link>
           </div>
           <Input
             id="password"
             name="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="••••••••"
             className="h-14 bg-muted/10 border-border focus:border-primary/50 text-foreground font-black italic text-sm rounded-2xl px-5 transition-all outline-none"
           />
           <InputFieldError field="password" state={state} />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full h-16 rounded-[1.25rem] bg-primary text-primary-foreground font-black italic uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-4"
      >
        {isPending ? (
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Authenticating...
          </div>
        ) : (
          <>
            Login
            <LogIn className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
