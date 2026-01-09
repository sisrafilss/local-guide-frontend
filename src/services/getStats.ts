import { serverFetch } from '@/lib/server-fetch';

export async function getStats() {
  try {
    const response = await serverFetch.get(`/admin/stats`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
      }`,
    };
  }
}
