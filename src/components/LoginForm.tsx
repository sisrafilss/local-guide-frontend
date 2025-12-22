'use client';

import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const LoginForm = ({ redirect }: { redirect?: string }) => {
  return (
    <form>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="button" variant="default" className="w-full">
              Login
            </Button>

            <FieldDescription className="px-6 text-center mt-2 text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a
                href="/register"
                className="text-primary hover:underline transition-colors"
              >
                Sign up
              </a>
            </FieldDescription>

            <FieldDescription className="px-6 text-center mt-1 text-muted-foreground">
              <a
                href="/forget-password"
                className="text-primary hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
