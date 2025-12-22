'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const ResetPasswordForm = ({ redirect }: { redirect?: string }) => {
  return (
    <form>
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* New Password */}
          <Field>
            <FieldLabel
              htmlFor="newPassword"
              className="text-gray-900 dark:text-gray-100"
            >
              New Password
            </FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel
              htmlFor="confirmPassword"
              className="text-gray-900 dark:text-gray-100"
            >
              Confirm Password
            </FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="button" className="w-full">
              Reset Password
            </Button>

            <FieldDescription className="px-6 text-center mt-4 text-gray-700 dark:text-gray-300">
              Remember your password?{' '}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Login
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
