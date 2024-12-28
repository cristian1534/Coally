import mongoose from "mongoose";
import { Response } from "express";
import { HttpResponse } from "../utils/validation.response";
import "dotenv/config";

const MONGO_URL = process.env.MONGO_URI as string;
const httpResponse = new HttpResponse();

mongoose.Promise = Promise;

export const initDB = async (res?: Response): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB.");
    if (res) httpResponse.Ok(res, "Connected to DB.");
    
  } catch (error: any) {
    console.log("Error connecting to DB");
    if (res) httpResponse.Ok(res, "Error connecting to DB.");
  }
};


