import { serverFetch } from '@/lib/server-fetch';

export async function getAdminDashboardData() {
  try {
    const response = await serverFetch.get(`/dashboard/admin`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong',
    };
  }
}
