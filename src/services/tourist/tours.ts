'use server';

import { serverFetch } from '@/lib/server-fetch';

export async function getAllTours(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/tours${queryString ? `?${queryString}` : ''}`
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

export async function getTourbyId(id: string) {
  try {
    const response = await serverFetch.get(`/tours/${id}`);
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

export type BookTourPayload = {
  listingId: string;
  touristId: string;
  guideId: string;
  startAt: string; // ISO string
  totalPrice: number;
};

export async function bookTour(payload: BookTourPayload) {
  try {
    const userPromise = await serverFetch.get('/auth/me');
    const userData = await userPromise.json();

    const touristId = userData?.data?.tourist.id;
    payload.touristId = touristId;
    console.log('TOURIST ID', touristId);
    console.log('PAYLOAD', payload);

    const response = await serverFetch.post('/booking', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log('RESULT', result);
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
