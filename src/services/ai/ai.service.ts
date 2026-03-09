'use server';

import { serverFetch } from '@/lib/server-fetch';

/**
 * AI Service for handling AI-related API calls.
 */
export const summarizeText = async (text: string) => {
  try {
    const response = await serverFetch.post('/ai/summarize', {
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to summarize text');
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
    };
  }
};
