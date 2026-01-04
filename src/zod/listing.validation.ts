import z from 'zod';

export enum ListingCategory {
  FOOD = 'FOOD',
  HISTORY = 'HISTORY',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  ADVENTURE = 'ADVENTURE',
  NIGHTLIFE = 'NIGHTLIFE',
  SHOPPING = 'SHOPPING',
  CUSTOM = 'CUSTOM',
}

export const updateListingSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must not exceed 1000 characters'),

  price: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) > 0,
      'Price must be a valid positive number'
    ),

  durationMin: z
    .string()
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) > 0,
      'Duration must be a valid positive integer'
    ),

  meetingPoint: z
    .string()
    .min(3, 'Meeting point must be at least 3 characters')
    .max(255, 'Meeting point must not exceed 255 characters'),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),

  maxGroupSize: z
    .string()
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) > 0,
      'Max group size must be a valid positive integer'
    ),

  category: z.enum(ListingCategory),
});
