import { getUserInfo } from '@/services/auth/getUserInfo';
import { getGuideDashboard } from '@/services/guide/getGuideDashboard';
import GuideDashboardContent from './GuideDashboardContent';

export const dynamic = 'force-dynamic';

const GuideDashboardPage = async () => {
  const user = await getUserInfo();

  if (!user) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6 text-center">
        <p className="text-destructive font-medium">You must be logged in to view the guide dashboard.</p>
      </div>
    );
  }

  let dashboardData = null;
  try {
    const result = await getGuideDashboard();
    if (result.success) {
      dashboardData = result.data;
    }
  } catch (error) {
    console.error('Failed to fetch guide dashboard data:', error);
  }

  return <GuideDashboardContent data={dashboardData} />;
};

export default GuideDashboardPage;
