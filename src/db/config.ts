import Logger from "../utils/winston";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export async function connectDatabase() {
  Logger.info("Connecting to MongoDB...");

  try {
    const DATABASE_URL: string | undefined = process.env.ATLAS_URI;

    if (!DATABASE_URL) {
      throw new Error("ATLAS_URI is not defined in .env file");
    }

    const connection = await mongoose.connect(DATABASE_URL);
    Logger.info("Connected to MongoDB!");
    return connection;
  } catch (error) {
    Logger.error(`Error: ${error}`);
  }
}
