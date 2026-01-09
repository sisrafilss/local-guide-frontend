import BookingStats from '@/components/modules/Tourist/BookingStats';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getBookingStats } from '@/services/tourist/booking';

export const dynamic = 'force-dynamic';

const TouristDashboardPage = async () => {
  // 1️⃣ Get logged-in user
  const user = await getUserInfo();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        You must be logged in to view your dashboard.
      </p>
    );
  }

  // 2️⃣ Fetch booking stats
  const stats = await getBookingStats();

  return (
    <div className="p-6 space-y-6">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Here’s a summary of your bookings and spending.
        </p>
      </div>

      {/* Booking Stats Component */}
      <BookingStats stats={stats?.data} />
    </div>
  );
};

export default TouristDashboardPage;
