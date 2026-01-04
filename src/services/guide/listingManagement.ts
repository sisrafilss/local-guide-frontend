'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { updateListingSchema } from '@/zod/listing.validation';

export const getListing = async (queryString: string) => {
  try {
    const response = await serverFetch.get(
      `/tours${queryString ? `${queryString}` : ''}`
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
};

export async function updateListing(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    durationMin: formData.get('durationMin') as string,
    meetingPoint: formData.get('meetingPoint') as string,
    city: formData.get('city') as string,
    maxGroupSize: formData.get('maxGroupSize') as string,
    category: formData.get('category') as string,
  };

  const validation = zodValidator(validationPayload, updateListingSchema);

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: 'Validation failed',
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  if (!validation.data) {
    return {
      success: false,
      message: 'Validation failed',
      formData: validationPayload,
      errors: [{ field: 'unknown', message: 'Invalid data' }],
    };
  }

  try {
    const response = await serverFetch.patch(`/tours/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.error('Update Listing error:', error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Failed to update admin',
      formData: validationPayload,
    };
  }
}
