import GuideDashboardStats from '@/components/modules/Guide/ListingManagement/GuideDashboardStat';
import { getStats } from '@/services/getStats';
import { userInfo } from 'os';

export const dynamic = 'force-dynamic';

const GuideDashboardPage = async () => {
  // 1️⃣ Get logged-in guide
  const user = await userInfo();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        You must be logged in to view the guide dashboard.
      </p>
    );
  }

  // 2️⃣ Fetch guide stats
  const statsData = await getStats();

  return (
    <div className="p-6 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Guide Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your bookings and recent activities.
        </p>
      </div>

      {/* Stats Component */}
      <GuideDashboardStats data={statsData.data} />
    </div>
  );
};

export default GuideDashboardPage;
