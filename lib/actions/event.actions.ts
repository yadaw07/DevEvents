'use server';

import { Event } from '@/database';
import connectDB from '../mongodb';

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();

    const similarEvents = await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    }).lean();

    // Fully serialize: converts ObjectId/Date instances to plain strings,
    // which .lean() alone doesn't do
    return JSON.parse(JSON.stringify(similarEvents));
  } catch (e) {
    process.env.NODE_ENV === 'development' && console.log(e);
    return [];
  }
}
