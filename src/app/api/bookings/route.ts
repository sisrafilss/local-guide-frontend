import { bookTour } from '@/services/tourist/tours';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const result = await bookTour(payload);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
