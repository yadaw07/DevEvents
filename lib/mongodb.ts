import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Shape of the cached connection object we store on `global`
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Next.js hot-reloads modules in dev, which would normally re-run this file
// and create a new connection on every change. We stash the cache on the
// Node.js `global` object so it survives module reloads.
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Reuse existing cache if present, otherwise initialize it
const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using a cached connection.
 * Safe to call multiple times/places — it will only ever open one
 * underlying connection.
 */
export async function connectDB(): Promise<Mongoose> {
  // Already connected — return immediately
  if (cached.conn) {
    return cached.conn;
  }

  // Connection in progress — wait on the existing promise instead of
  // starting a second one (guards against race conditions on concurrent calls)
  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable in .env.local',
      );
    }

    const opts = {
      bufferCommands: false, // fail fast instead of queuing ops before connection
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset promise on failure so the next call can retry
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
