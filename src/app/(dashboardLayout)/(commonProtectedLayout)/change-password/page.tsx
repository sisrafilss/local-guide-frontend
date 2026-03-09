export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ChangePasswordForm from '@/components/modules/Auth/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <ScrollReveal variant="blur-up">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account security and password preferences.
          </p>
        </div>
        <ChangePasswordForm />
      </ScrollReveal>
    </div>
  );
};

export default ChangePasswordPage;
