import mongoose from "mongoose";

import { app } from "./app";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import { roleSeeder } from "./seeders/seeder";
import { adminSeeder } from "./seeders/admin.seeder";
import { adminRoleSeeder } from "./seeders/adminRole.seeder";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new HttpExceptionBadRequest("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new HttpExceptionBadRequest("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    await roleSeeder();
    await adminSeeder();
    await adminRoleSeeder();

    console.info("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
