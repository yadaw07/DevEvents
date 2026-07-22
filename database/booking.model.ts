import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { Event } from './event.model';

// Basic RFC-5322-ish email pattern, good enough for schema-level validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shape of a Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: (props) => `"${props.value}" is not a valid email address`,
      },
    },
  },
  { timestamps: true }, // auto-manages createdAt / updatedAt
);

// Speeds up lookups/filters by event (e.g. "all bookings for this event")
BookingSchema.index({ eventId: 1 });

// Ensure the referenced event actually exists before persisting a booking
BookingSchema.pre('save', async function (this: IBooking) {
  if (this.isModified('eventId')) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error(`Event with id "${this.eventId}" does not exist`);
    }
  }
});

// Reuse existing model in dev (hot-reload) instead of recompiling the schema
export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
