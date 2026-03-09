'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/services/auth/auth.service';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  KeyRound, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import InputFieldError from '@/components/shared/InputFieldError';

const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (state?.success) {
      toast.success('Password updated successfully');
    }

    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="md:col-span-12">
          <Card className="shadow-sm border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Change Password</CardTitle>
                  <CardDescription>Enter your current and new password below.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-5">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="currentPassword" 
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      Current Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        autoComplete="current-password"
                        className="bg-muted/30 focus-visible:ring-primary/50 font-medium pl-10"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                    <InputFieldError field="currentPassword" state={state} />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="newPassword" 
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      New Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        className="bg-muted/30 focus-visible:ring-primary/50 font-medium pl-10"
                      />
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                    <InputFieldError field="newPassword" state={state} />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="confirmPassword" 
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Confirm New Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Repeat your new password"
                        autoComplete="new-password"
                        className="bg-muted/30 focus-visible:ring-primary/50 font-medium pl-10"
                      />
                      <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                    <InputFieldError field="confirmPassword" state={state} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-amber-600 uppercase">Requirements</p>
                    <p className="text-[11px] text-amber-600/80 leading-relaxed font-medium">
                      Minimum 8 characters, including an uppercase letter, a number, and a special character.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full font-bold h-11 shadow-sm" 
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating Security...
                    </div>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t py-4">
               <div className="flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                <p className="text-[10px] text-muted-foreground font-medium italic">
                  For your protection, changing your password will terminate all other active sessions and log you out.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
