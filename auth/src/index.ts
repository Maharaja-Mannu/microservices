import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    // await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    await mongoose.connect(process.env.DB_URI!);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!");
  });
};
start();
