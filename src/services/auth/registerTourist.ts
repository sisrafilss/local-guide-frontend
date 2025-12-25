/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { registerTouristValidationZodSchema } from '@/zod/auth.validation';
import { loginUser } from './loginUser';

export const registerTourist = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      name: formData.get('name'),
      //   address: formData.get('address'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (
      zodValidator(payload, registerTouristValidationZodSchema).success ===
      false
    ) {
      return zodValidator(payload, registerTouristValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerTouristValidationZodSchema
    ).data;

    console.log('VALIDATED PAYLOAD', validatedPayload);

    const registerData = {
      name: validatedPayload.name,
      email: validatedPayload.email,
      password: validatedPayload.password,
    };

    const newFormData = new FormData();

    newFormData.append('data', JSON.stringify(registerData));

    if (formData.get('file')) {
      newFormData.append('file', formData.get('file') as Blob);
    }

    const res = await serverFetch.post('/user/create-tourist', {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Registration Failed. Please try again.'
      }`,
    };
  }
};
