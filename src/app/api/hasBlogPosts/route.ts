import { hasBlogPosts } from '@/utils/blog';
import { NextResponse } from 'next/server';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const hasPosts = hasBlogPosts();
    return NextResponse.json({ hasPosts });
  } catch (error) {
    console.error('Error in hasBlogPosts API:', error);
    return NextResponse.json(
      { error: 'Failed to check blog posts' },
      { status: 500 }
    );
  }
} 