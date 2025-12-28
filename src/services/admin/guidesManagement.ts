'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { updateGuideZodSchema } from '@/zod/guide.validation';

export async function getGuides(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/guide${queryString ? `?${queryString}` : ''}`
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
 * HARD DELETE Guide
 * API: DELETE /guide/:id
 */
export async function deleteGuide(id: string) {
  try {
    const response = await serverFetch.delete(`/guide/${id}`);
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
export async function updateGuide(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload: any = {
    name: formData.get('name') as string,
    contactNumber: formData.get('contactNumber') as string,
    address: formData.get('address') as string,
  };

  const validation = zodValidator(validationPayload, updateGuideZodSchema);
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
