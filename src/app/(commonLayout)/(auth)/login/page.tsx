import { ScrollReveal } from '@/components/animations/ScrollReveal';
import LoginForm from '@/components/LoginForm';

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <ScrollReveal variant="zoom-in" duration={0.55} className="w-full max-w-md">
        <div className="w-full space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm redirect={params.redirect} />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default LoginPage;
