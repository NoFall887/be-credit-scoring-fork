import mongoose from "mongoose";
import Admin from "../models/admin.model";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import PasswordHasher from "../utils/passwordHasher.util";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);
// Define an array of Role data to seed
const usersData = [
  {
    _id: new mongoose.Types.ObjectId("644667cdc80389bc14956b01"),
    name: "ADMIN",
    email: "admin@email.com",
    password: PasswordHasher.hashPassword("admin"),
  },
  {
    _id: new mongoose.Types.ObjectId("644667cdc80389bc14956b02"),
    name: "HR",
    email: "hr@email.com",
    password: PasswordHasher.hashPassword("hr"),
  },
  {
    _id: new mongoose.Types.ObjectId("644667cdc80389bc14956b03"),
    name: "GUEST",
    email: "guest@email.com",
    password: PasswordHasher.hashPassword("guest"),
  },
];

// Seed the Role data to the database
export const adminSeeder = async () => {
  try {
    const user = await Admin.findOne({ name: "" });
    if (user) {
      return console.log("User already seeded");
    } else {
      // Loop through the users data array and create new user documents
      for (const userData of usersData) {
        const user = new Admin(userData);
        await user.save(); // Save each user document to the database
      }
      console.log("Users seeded successfully.");
    }
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};
