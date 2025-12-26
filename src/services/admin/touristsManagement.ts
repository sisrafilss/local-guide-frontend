/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { updateTouristZodSchema } from '@/zod/tourist.validation';

/**
 * GET ALL TOURISTS
 * API: GET /tourist?queryParams
 */
export async function getTourists(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/tourist${queryString ? `?${queryString}` : ''}`
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

/**
 * GET Tourist BY ID
 * API: GET /tourist/:id
 */
export async function getTouristById(id: string) {
  try {
    const response = await serverFetch.get(`/tourist/${id}`);
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

/**
 * UPDATE TOURIST
 * API: PATCH /tourist/:id
 */
export async function updateTourist(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload: any = {
    name: formData.get('name') as string,
    contactNumber: formData.get('contactNumber') as string,
    address: formData.get('address') as string,
  };

  const validation = zodValidator(validationPayload, updateTouristZodSchema);
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
    const response = await serverFetch.patch(`/tourist/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Update tourist error:', error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Failed to update tourist',
      formData: validationPayload,
    };
  }
}

/**
 * SOFT DELETE Tourist
 * API: DELETE /tourist/soft/:id
 */
export async function softDeleteTourist(id: string) {
  try {
    const response = await serverFetch.delete(`/tourist/soft/${id}`);
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

/**
 * HARD DELETE Tourist
 * API: DELETE /tourist/:id
 */
export async function deleteTourist(id: string) {
  try {
    const response = await serverFetch.delete(`/tourist/${id}`);
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
