import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient;
let dB: Db;

const dbName = process.env.DB_NAME || "tiendaDB";

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUrl = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${dbName}?appName=${process.env.MONGO_APP_NAME}`;

    client = new MongoClient(mongoUrl);
    await client.connect();
    dB = client.db(dbName);

    console.log("Connected to MongoDB at db: " + dbName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export const getDb = (): Db => {
  if (!dB) throw new Error("Database not connected. Call connectMongoDB first.");
  return dB;
};