import mongoose, { Schema, Document, Model } from 'mongoose';

// Allowed values for the `mode` field
export type EventMode = 'online' | 'offline' | 'hybrid';

// Shape of an Event document (excludes Mongoose internals)
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // stored as ISO date string (YYYY-MM-DD)
  time: string; // stored as 24-hour "HH:mm"
  mode: EventMode;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true }, // generated in pre-save hook, not user-supplied
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      trim: true,
      enum: ['online', 'offline', 'hybrid'],
    },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  { timestamps: true }, // auto-manages createdAt / updatedAt
);

// Explicit unique index on slug (in addition to `unique: true` above, for clarity/intent)
EventSchema.index({ slug: 1 }, { unique: true });

/**
 * Converts a title into a URL-friendly slug.
 * e.g. "Next.js Conf 2025!" -> "nextjs-conf-2025"
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric runs -> single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

/**
 * Normalizes a date string to ISO format (YYYY-MM-DD).
 * Throws if the input cannot be parsed into a valid date.
 */
function normalizeDate(rawDate: string): string {
  const parsed = new Date(rawDate);
  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: "${rawDate}"`);
  }
  return parsed.toISOString().split('T')[0];
}

/**
 * Normalizes a time string to 24-hour "HH:mm" format.
 * Accepts formats like "9:5", "09:05", "9:05 AM", "21:30".
 */
function normalizeTime(rawTime: string): string {
  const trimmed = rawTime.trim();

  // Handle "H:mm AM/PM" style input
  const meridiemMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (meridiemMatch) {
    let hours = parseInt(meridiemMatch[1], 10);
    const minutes = meridiemMatch[2];
    const meridiem = meridiemMatch[3].toUpperCase();

    if (meridiem === 'PM' && hours !== 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  // Handle plain 24-hour "H:mm" or "HH:mm" input
  const plainMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (plainMatch) {
    const hours = parseInt(plainMatch[1], 10);
    const minutes = plainMatch[2];
    if (hours < 0 || hours > 23) {
      throw new Error(`Invalid time value: "${rawTime}"`);
    }
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  throw new Error(`Invalid time value: "${rawTime}"`);
}

// Regenerate slug only when title changes; always normalize date/time on save
EventSchema.pre('save', function (this: IEvent) {
  if (this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }

  if (this.isModified('date')) {
    this.date = normalizeDate(this.date);
  }

  if (this.isModified('time')) {
    this.time = normalizeTime(this.time);
  }
});

// Reuse existing model in dev (hot-reload) instead of recompiling the schema
export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
