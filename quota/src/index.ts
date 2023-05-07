import mongoose from "mongoose";

import { app } from "./app";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import { quotaSeeder } from "./seeders/quota.seeder";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new HttpExceptionBadRequest("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    await quotaSeeder();

    console.info("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
