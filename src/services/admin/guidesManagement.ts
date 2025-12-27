import { serverFetch } from '@/lib/server-fetch';

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
