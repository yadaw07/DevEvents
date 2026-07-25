'use server';

import { Event } from '@/database';
import connectDB from '../mongodb';

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    // return similar events based on tags
    return await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    }).lean(); // lean returns plain JavaScript objects
  } catch {
    return [];
  }
}
