import { ScrollReveal } from '@/components/animations/ScrollReveal';

const ForgetPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <ScrollReveal variant="pop" className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 text-center shadow-md">
          <h1 className="text-2xl font-semibold text-foreground">
            Forget Password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Password reset flow will be available soon.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ForgetPasswordPage;
