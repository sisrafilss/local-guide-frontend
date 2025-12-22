'use client';

import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const RegisterForm = () => {
  return (
    <form>
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
          </Field>

          {/* Address */}
          <Field>
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
          </Field>

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
          </Field>

          {/* Password */}
          <Field>
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
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="button" className="w-full">
              Create Account
            </Button>

            <FieldDescription className="px-6 text-center text-gray-700 dark:text-gray-300 mt-2">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
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
