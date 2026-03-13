'use client';

import { registerTourist } from '@/services/auth/registerTourist';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import InputFieldError from './shared/InputFieldError';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { User, MapPin, Mail, Phone, Lock, Sparkles, UserPlus } from 'lucide-react';

const RegisterForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(registerTourist, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const inputStyles = "h-14 bg-muted/10 border-border focus:border-primary/50 text-foreground font-black italic text-sm rounded-2xl px-5 transition-all outline-none placeholder:text-muted-foreground/30";
  const labelStyles = "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2 mb-2";

  return (
    <form action={formAction} className="space-y-8">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <User className="h-3 w-3 text-primary/60" />
            Full Name
          </label>
          <Input id="name" name="name" type="text" placeholder="John Doe" className={inputStyles} />
          <InputFieldError field="name" state={state} />
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <MapPin className="h-3 w-3 text-primary/60" />
            Address
          </label>
          <Input id="address" name="address" type="text" placeholder="Dhaka, BD" className={inputStyles} />
          <InputFieldError field="address" state={state} />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <Mail className="h-3 w-3 text-primary/60" />
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="explorer@nodes.com" className={inputStyles} />
          <InputFieldError field="email" state={state} />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <Phone className="h-3 w-3 text-primary/60" />
            Phone
          </label>
          <Input id="phone" name="phone" type="tel" placeholder="+880..." className={inputStyles} />
          <InputFieldError field="phone" state={state} />
        </div>

        {/* Gender Selection */}
        <div className="md:col-span-2 space-y-3">
          <label className={labelStyles}>
             <Sparkles className="h-3 w-3 text-primary/60" />
             Gender
          </label>
          <div className="flex gap-4">
             {['MALE', 'FEMALE'].map((g) => (
                <label key={g} className="flex-1 relative cursor-pointer group">
                   <input type="radio" name="gender" value={g} className="sr-only peer" />
                   <div className="h-14 flex items-center justify-center rounded-2xl border-2 border-border bg-muted/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground group-hover:bg-muted/20 italic">
                      {g}
                   </div>
                </label>
             ))}
          </div>
          <InputFieldError field="gender" state={state} />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <Lock className="h-3 w-3 text-primary/60" />
            Password
          </label>
          <Input id="password" name="password" type="password" placeholder="••••••••" className={inputStyles} />
          <InputFieldError field="password" state={state} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className={labelStyles}>
            <Lock className="h-3 w-3 text-primary/60" />
            Confirm Password
          </label>
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className={inputStyles} />
          <InputFieldError field="confirmPassword" state={state} />
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
            Syncing...
          </div>
        ) : (
          <>
            Create Account
            <UserPlus className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
