import { NextResponse } from 'next/server';
import { getClusterBySlug } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const cluster = getClusterBySlug(slug);

    if (!cluster) {
      return NextResponse.json(
        { success: false, error: 'Cluster not found' },
        { status: 404 }
      );
    }

    // Return the cluster details
    return NextResponse.json({
      success: true,
      data: cluster
    });
  } catch (error) {
    console.error('Error fetching cluster details:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
