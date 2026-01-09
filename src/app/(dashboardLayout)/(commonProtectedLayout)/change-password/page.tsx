export const dynamic = 'force-dynamic';

import ChangePasswordForm from '@/components/modules/Auth/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Change Password
          </h1>
          {/* <p className="text-sm text-muted-foreground">
            
          </p> */}
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
