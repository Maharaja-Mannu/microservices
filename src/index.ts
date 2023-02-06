import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app";

const main = async () => {
  try {
    if (!process.env.DB_URI || !process.env.JWT_SECRET) {
      throw new Error("Add env variable");
    }
    // connect to db
    await mongoose.connect(process.env.DB_URI!);
    console.log("Connected to db");
    app.listen(5000, () => {
      console.log("Listening on port 5000");
    });
  } catch (error) {
    console.error(error);
  }
};

main();
