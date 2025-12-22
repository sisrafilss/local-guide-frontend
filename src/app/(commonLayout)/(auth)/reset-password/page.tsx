import ResetPasswordForm from '@/components/ResetPasswordForm';

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  const redirect = params.redirect;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-lg bg-white dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reset Your Password
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your new password below to reset your account password
          </p>
        </div>
        <ResetPasswordForm redirect={redirect} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
