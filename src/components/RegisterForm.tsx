'use client';

import { registerPatient } from '@/services/auth/registerPatient';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import InputFieldError from './shared/InputFieldError';
import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="w-full max-w-lg mx-auto">
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-gray-900 dark:text-gray-100"
            >
              Full Name
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Address */}
          {/* <Field>
            <FieldLabel
              htmlFor="address"
              className="text-gray-900 dark:text-gray-100"
            >
              Address
            </FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <InputFieldError field="address" state={state} />
          </Field> */}

          {/* Email */}
          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-gray-900 dark:text-gray-100"
            >
              Email
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field className="md:col-span-2">
            <FieldLabel
              htmlFor="password"
              className="text-gray-900 dark:text-gray-100"
            >
              Password
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field className="md:col-span-2">
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
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
