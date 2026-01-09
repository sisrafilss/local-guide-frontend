import { BookTourPayload } from './tours';

export const bookTourClient = async (payload: BookTourPayload) => {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Booking failed',
    };
  }
};
