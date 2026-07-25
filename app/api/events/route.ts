import { NextRequest, NextResponse } from 'next/server';

import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // parses the request body as multipart/form-data and returns a FormData object
    const formData = await req.formData();
    let event;

    try {
      // turns form fields into a regular JS object
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: 'Invalid json format' },
        { status: 400 },
      );
    }

    const file = formData.get('image') as File;

    let tags, agenda;
    try {
      tags = JSON.parse(formData.get('tags') as string);
      agenda = JSON.parse(formData.get('agenda') as string);
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON for tags/agenda' },
        { status: 400 },
      );
    }

    if (!file)
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 },
      );

    let uploadResult: UploadApiResponse;

    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer(); // generic binary data
      const buffer = Buffer.from(arrayBuffer); // Node-flavored binary data

      uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: 'image', folder: 'DevEvent' },
            (
              error: UploadApiErrorResponse | undefined,
              results?: UploadApiResponse,
            ) => {
              if (error) return reject(error);

              if (!results)
                return reject(new Error('Upload failed: no result returned'));
              resolve(results);
            },
          )
          .end(buffer);
      });
    } else {
      uploadResult = await cloudinary.uploader.upload(file as string, {
        resource_type: 'image',
        folder: 'DevEvent',
      });
    }

    event.image = uploadResult.secure_url;

    let createdEvent;
    try {
      createdEvent = await Event.create({ ...event, tags, agenda });
    } catch (createErr) {
      await cloudinary.uploader.destroy(uploadResult.public_id).catch(() => {});
      throw createErr;
    }

    return NextResponse.json(
      { message: 'Event created successfully', events: createdEvent },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: err instanceof Error ? err.message : 'Something went wrong',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { message: 'Events fetched successfully', events },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Event fething failed',
        error: err instanceof Error ? err.message : 'Something went wrong',
      },
      { status: 500 },
    );
  }
}
