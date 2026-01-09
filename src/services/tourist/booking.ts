import { serverFetch } from '@/lib/server-fetch';

export async function getAllBookings(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/booking${queryString ? `?${queryString}` : ''}`
    );
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

export async function getBookingStats() {
  try {
    const response = await serverFetch.get(`/booking/stats`);
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
