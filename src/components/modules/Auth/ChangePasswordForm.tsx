'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/services/auth/auth.service';
import { useActionState, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  KeyRound, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  X
} from 'lucide-react';
import InputFieldError from '@/components/shared/InputFieldError';
import { cn } from '@/lib/utils';

const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPass, setNewPass] = useState('');

  const requirements = [
    { label: '8+ characters', check: (val: string) => val.length >= 8 },
    { label: 'One uppercase letter', check: (val: string) => /[A-Z]/.test(val) },
    { label: 'One number', check: (val: string) => /[0-9]/.test(val) },
    { label: 'One special character', check: (val: string) => /[^A-Za-z0-9]/.test(val) },
  ];

  useEffect(() => {
    if (state?.success) {
      toast.success('Your security has been updated successfully.');
      setNewPass('');
    }

    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-12">
          <Card className="border-border/60 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="space-y-1 pb-8 border-b bg-muted/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary ring-4 ring-primary/5">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Access Security</CardTitle>
                  <CardDescription className="text-sm font-medium">Manage your authentication credentials.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <form action={formAction} className="space-y-8">
                <div className="grid grid-cols-1 gap-y-6 md:gap-x-12">
                  <motion.div variants={item} className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2.5">
                      <Label 
                        htmlFor="currentPassword" 
                        className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 flex items-center gap-2"
                      >
                        <KeyRound className="h-3.5 w-3.5 text-primary/60" />
                        Verify Identity
                      </Label>
                      <div className="relative group">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrent ? "text" : "password"}
                          placeholder="Current password"
                          autoComplete="current-password"
                          className="h-11 bg-muted/50 border-border/40 focus-visible:ring-primary/40 focus-visible:bg-background pl-10 pr-12 transition-all font-medium"
                        />
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                        <button 
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-md text-muted-foreground/50 hover:text-foreground transition-colors"
                        >
                          {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <InputFieldError field="currentPassword" state={state} />
                    </div>

                    <Separator className="bg-border/40" />

                    {/* New Password Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-6">
                        <div className="space-y-2.5">
                          <Label 
                            htmlFor="newPassword" 
                            className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 flex items-center gap-2"
                          >
                            <ShieldCheck className="h-3.5 w-3.5 text-primary/60" />
                            Secure New Password
                          </Label>
                          <div className="relative group">
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type={showNew ? "text" : "password"}
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              placeholder="New password"
                              autoComplete="new-password"
                              className="h-11 bg-muted/50 border-border/40 focus-visible:ring-primary/40 focus-visible:bg-background pl-10 pr-12 transition-all font-medium"
                            />
                            <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                            <button 
                              type="button"
                              onClick={() => setShowNew(!showNew)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-md text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <InputFieldError field="newPassword" state={state} />
                        </div>

                        <div className="space-y-2.5">
                          <Label 
                            htmlFor="confirmPassword" 
                            className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80 flex items-center gap-2"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary/60" />
                            Confirm Authentication
                          </Label>
                          <div className="relative group">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirm ? "text" : "password"}
                              placeholder="Repeat new password"
                              autoComplete="new-password"
                              className="h-11 bg-muted/50 border-border/40 focus-visible:ring-primary/40 focus-visible:bg-background pl-10 pr-12 transition-all font-medium"
                            />
                            <CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                            <button 
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-md text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <InputFieldError field="confirmPassword" state={state} />
                        </div>
                      </div>

                      {/* Password Requirements Column */}
                      <Card className="bg-muted/30 border-dashed border-border/60 shadow-none h-full flex flex-col justify-center">
                        <CardHeader className="pb-3 pt-4 px-4">
                          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                            <Info className="h-3 w-3" />
                            Strength Requirements
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-2">
                          {requirements.map((req, idx) => {
                            const isMet = req.check(newPass);
                            return (
                              <div key={idx} className="flex items-center gap-2.5">
                                <div className={cn(
                                  "h-4 w-4 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                                  isMet ? "bg-emerald-500/20 text-emerald-600 scale-110" : "bg-muted text-muted-foreground/40"
                                )}>
                                  {isMet ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : <X className="h-2.5 w-2.5" strokeWidth={3} />}
                                </div>
                                <span className={cn(
                                  "text-[11px] font-bold tracking-tight transition-colors duration-300",
                                  isMet ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground/60"
                                )}>
                                  {req.label}
                                </span>
                              </div>
                            );
                          })}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={item} className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full font-black h-12 shadow-lg shadow-primary/20 rounded-xl relative overflow-hidden group/btn" 
                    disabled={isPending}
                  >
                    <AnimatePresence mode="wait">
                      {isPending ? (
                        <motion.div 
                          key="pending"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3"
                        >
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Upgrading Security...
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                          Update Password
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/40 border-t border-border/40 py-5 px-8">
               <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground font-semibold italic">
                  Critical Security Note: Changing your password will immediately invalidate all other sessions on all devices for your protection.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePasswordForm;
