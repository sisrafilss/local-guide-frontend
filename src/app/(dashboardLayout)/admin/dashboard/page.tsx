import { ScrollReveal } from '@/components/animations/ScrollReveal';
import AdminDashboardStats from '@/components/modules/Admin/AdminStats';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getStats } from '@/services/getStats';

export const dynamic = 'force-dynamic';

const AdminDashboardPage = async () => {
  // 1️⃣ Get logged-in user
  const user = await getUserInfo();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        You must be logged in to view the admin dashboard.
      </p>
    );
  }

  // 2️⃣ Fetch admin stats
  const statsData = await getStats();

  return (
    <div className="p-6 space-y-6">
      {/* Page Heading */}
      <ScrollReveal variant="fade-down" duration={0.45}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of all users, guides, and tourists in the system.
          </p>
        </div>
      </ScrollReveal>

      {/* Admin Stats Component */}
      <ScrollReveal variant="fade-up" amount={0.15}>
        <AdminDashboardStats data={statsData.data} />
      </ScrollReveal>
    </div>
  );
};

export default AdminDashboardPage;
