'use client';

import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { changePassword } from '@/services/auth/auth.service';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

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
    <div className="mx-auto w-full max-w-lg">
      {/* Form */}
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Current Password */}
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Current Password
              </FieldLabel>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                autoComplete="current-password"
              />
              <InputFieldError field="currentPassword" state={state} />
            </Field>

            {/* New Password */}
            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <InputFieldError field="newPassword" state={state} />

              <FieldDescription className="text-xs">
                Password must be at least 8 characters long and include an
                uppercase letter, a number, and a special character.
              </FieldDescription>
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm New Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter new password"
                autoComplete="new-password"
              />
              <InputFieldError field="confirmPassword" state={state} />
            </Field>
          </div>

          {/* Actions */}
          <FieldGroup className="mt-6">
            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Password'}
              </Button>

              <FieldDescription className="mt-3 text-center text-xs">
                For security reasons, you may be logged out after changing your
                password.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
