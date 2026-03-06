'use client';

import { loginUser } from '@/services/auth/loginUser';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import InputFieldError from './shared/InputFieldError';
import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

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
      tourist: {
        email: 'mamunali@gmail.com',
        password: '123456',
      },
      guide: {
        email: 'ashraful.islam@gmail.com',
        password: '123456',
      },
      admin: {
        email: 'admin@gmail.com',
        password: '123456',
      },
    };

    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <form action={formAction}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        {/* Demo Login Buttons */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('tourist')}
          >
            Login as Tourist (Demo)
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('guide')}
          >
            Login as Guide (Demo)
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('admin')}
          >
            Login as Admin (Demo)
          </Button>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>

            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
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
