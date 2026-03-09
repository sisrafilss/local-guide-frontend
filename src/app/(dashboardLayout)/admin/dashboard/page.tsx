import { getAdminDashboardData } from '@/services/admin/getAdminDashboard';
import { getUserInfo } from '@/services/auth/getUserInfo';
import AdminDashboardContent from './AdminDashboardContent';

export const dynamic = 'force-dynamic';

interface DashboardData {
  overview: {
    totalUsers: number;
    totalGuides: number;
    totalTourists: number;
    totalBookings: number;
    totalListings: number;
    verifiedGuides: number;
    unverifiedGuides: number;
    activeTourists: number;
    activeListings: number;
  };
  monthlyStats: {
    monthlyBookings: number;
    lastMonthBookings: number;
    growth: number;
  };
  financials: {
    averageDailyRate: number;
    totalRevenue: number;
  };
  bookingsByStatus: {
    CONFIRMED: number;
    PENDING: number;
  };
  recentBookings: Array<{
    id: string;
    status: string;
    totalPrice: number;
    startAt: string;
    listingTitle: string;
    listingCity: string;
    touristName: string;
    touristEmail: string;
    guideName: string;
    createdAt: string;
  }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  }>;
}

const AdminDashboardPage = async () => {
  const user = await getUserInfo();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        You must be logged in to view the admin dashboard.
      </p>
    );
  }

  let dashboardData: DashboardData | null = null;
  try {
    const result = await getAdminDashboardData();
    if (result.success) {
      dashboardData = result.data;
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }

  return <AdminDashboardContent data={dashboardData} />;
};

export default AdminDashboardPage;
