/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { serverFetch } from '@/lib/server-fetch';

export async function checkAuthStatus(): Promise<{ isLoggedIn: boolean; userId?: string; role?: string }> {
  try {
    const response = await fetch('/api/auth/check', {
      method: 'GET',
      credentials: 'include',
    });
    
    if (!response.ok) {
      return { isLoggedIn: false };
    }
    
    const result = await response.json();
    return {
      isLoggedIn: result.success,
      userId: result.data?.id,
      role: result.data?.role,
    };
  } catch (error) {
    console.log('Auth check error:', error);
    return { isLoggedIn: false };
  }
}