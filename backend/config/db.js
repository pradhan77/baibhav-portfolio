import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoose
 * Gracefully falls back to in-memory store if MONGODB_URI is absent or unreachable.
 * Never logs the connection string.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  if (!uri) {
    console.warn('[MongoDB Warning] MONGODB_URI is missing or empty. Operating with in-memory fallback store.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB] Connected successfully: database "${conn.connection.name}"`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Connection failed (${error.message}). Operating with in-memory fallback store.`);
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB] Connection disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB Error]', err.message);
});
