'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import {
  createListingZodSchema,
  updateListingSchema,
} from '@/zod/listing.validation';

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

export async function createListing(_prevState: any, formData: FormData) {
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

  const userPromise = await serverFetch.get('/auth/me');
  const userData = await userPromise.json();

  // const accessToken = await getCookie('accessToken');

  // const verifiedToken: JwtPayload | string = jwt.verify(
  //   accessToken as string,
  //   process.env.JWT_SECRET as string
  // );

  // if (typeof verifiedToken === 'string') {
  //   throw new Error('Invalid token');
  // }

  const validation = zodValidator(validationPayload, createListingZodSchema);

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
    const response = await serverFetch.post('/tours', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guideId: userData?.data?.guide?.id,
        ...validation.data,
      }),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.error('Create Listing error:', error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Failed to create listing',
      formData: validationPayload,
    };
  }
}

export async function deleteListing(id: string) {
  try {
    const response = await serverFetch.delete(`/tours/${id}`);
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
