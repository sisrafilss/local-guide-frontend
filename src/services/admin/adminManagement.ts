'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { updateAdminZodSchema } from '@/zod/admin.validation';

export async function getAdmins(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/admin${queryString ? `?${queryString}` : ''}`
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
 * HARD DELETE ADMIN
 * API: DELETE /admin/:id
 */
export async function deleteAdmin(id: string) {
  try {
    const response = await serverFetch.delete(`/admin/${id}`);
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
 * UPDATE ADMIN
 * API: PATCH /admin/:id
 */
export async function updateAdmin(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload: any = {
    name: formData.get('name') as string,
    contactNumber: formData.get('contactNumber') as string,
    address: formData.get('address') as string,
  };

  const validation = zodValidator(validationPayload, updateAdminZodSchema);

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
    const response = await serverFetch.patch(`/admin/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Update admin error:', error);
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
