import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("MONGO_URI is not defined in environment variables");

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDb = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
            console.log("MongoDB connected");
            return mongoose;
        }).catch((err) => {
            console.error("MongoDB connection failed", err);
            throw err;
        });
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn;
};
