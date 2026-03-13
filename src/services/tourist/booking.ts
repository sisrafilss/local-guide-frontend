'use server';

import { serverFetch } from '@/lib/server-fetch';

export async function createBooking(data: any) {
  try {
    const response = await serverFetch.post(
      '/tourist-dashboard/bookings',
      data
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

export async function getAllBookings(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/tourist-dashboard/bookings${queryString ? `?${queryString}` : ''}`
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
    const response = await serverFetch.get(`/tourist-dashboard/bookings/stats`);
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

export async function getBookingById(id: string) {
  try {
    const response = await serverFetch.get(`/tourist-dashboard/bookings/${id}`);
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

export async function cancelBooking(id: string) {
  try {
    const response = await serverFetch.patch(
      `/tourist-dashboard/bookings/${id}/cancel`,
      {
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: `API Error: ${response.status} ${response.statusText}`,
      };
    }

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

export async function getBookingGuides() {
  try {
    const response = await serverFetch.get('/tourist-dashboard/guides');
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

export async function getBookingCities() {
  try {
    const response = await serverFetch.get('/tourist-dashboard/cities');
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
