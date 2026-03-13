import { getUserInfo } from '@/services/auth/getUserInfo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userInfo = await getUserInfo();
    
    if (userInfo && userInfo.id) {
      return NextResponse.json({
        success: true,
        data: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role,
        },
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Not authenticated',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Not authenticated',
    });
  }
}