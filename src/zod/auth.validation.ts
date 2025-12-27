/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod';

export const registerTouristValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),

    address: z.string().min(1, { message: 'Address is required' }),

    phone: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits' })
      .max(15, { message: 'Phone number must be at most 15 digits' })
      .regex(/^\+?[0-9]+$/, {
        message: 'Phone number can contain only numbers and optional +',
      }),

    gender: z.enum(['MALE', 'FEMALE'], {
      message: 'Gender is required',
    }),

    email: z.email({ message: 'Valid email is required' }),

    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),

    confirmPassword: z.string().min(6, {
      message:
        'Confirm Password is required and must be at least 6 characters long',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginValidationZodSchema = z.object({
  email: z.email({
    message: 'Email is required',
  }),
  password: z
    .string('Password is required')
    .min(6, {
      error: 'Password is required and must be at least 6 characters long',
    })
    .max(100, {
      error: 'Password must be at most 100 characters long',
    }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
