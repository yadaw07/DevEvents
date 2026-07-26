'use server';

import { Booking } from '@/database';
import connectDB from '../mongodb';

interface props {
  eventId: string;
  slug?: string;
  email: string;
}

export async function createBooking({ eventId, slug, email }: props) {
  try {
    await connectDB();

    const bookingDoc = await Booking.create({ eventId, email });
    const booking = JSON.parse(JSON.stringify(bookingDoc));

    return { success: true, booking };
  } catch (e) {
    process.env.NODE_ENV === 'development' && console.error(e);
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Something went wrong',
    };
  }
}
