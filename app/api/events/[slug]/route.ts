import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 },
      );
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query events by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: 'Event fetched successfully',
      event,
    });
  } catch (err) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', err);
    }

    return NextResponse.json(
      {
        message: 'Event fething failed',
        error: err instanceof Error ? err.message : 'Something went wrong',
      },
      { status: 500 },
    );
  }
}
