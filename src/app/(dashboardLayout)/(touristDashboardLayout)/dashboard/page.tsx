import { getUserInfo } from '@/services/auth/getUserInfo';
import { getTouristDashboard } from '@/services/tourist/getTouristDashboard';
import TouristDashboardContent from './TouristDashboardContent';

export const dynamic = 'force-dynamic';

const TouristDashboardPage = async () => {
  const user = await getUserInfo();

  if (!user) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6 text-center">
        <p className="text-destructive font-bold uppercase tracking-widest text-xs">Auth Required. Buffer Restricted.</p>
      </div>
    );
  }

  let dashboardData = null;
  try {
    const result = await getTouristDashboard();
    if (result.success) {
      dashboardData = result.data;
    }
  } catch (error) {
    console.error('Failed to fetch tourist dashboard data:', error);
  }

  return <TouristDashboardContent data={dashboardData} />;
};

export default TouristDashboardPage;
