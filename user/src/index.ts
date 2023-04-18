import mongoose from "mongoose";

import { app } from "./app";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import { userSeeder } from "./seeders/user.seeder";
import { documentSeeder } from "./seeders/document.seeder";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new HttpExceptionBadRequest("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new HttpExceptionBadRequest("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    await userSeeder();
    await documentSeeder();

    console.info("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
