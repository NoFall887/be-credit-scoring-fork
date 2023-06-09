import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import AdminRole from "../models/adminRole.model";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

// Seed the Role data to the database
export const adminRoleSeeder = async () => {
  // Define an array of Role data to seed
  const usersData = [
    {
      admin_id: new mongoose.Types.ObjectId("644667cdc80389bc14956b01"),
      role_id: new mongoose.Types.ObjectId("64467970b3e320db6f805201"),
    },
    {
      admin_id: new mongoose.Types.ObjectId("644667cdc80389bc14956b02"),
      role_id: new mongoose.Types.ObjectId("64467970b3e320db6f805202"),
    },
    {
      admin_id: new mongoose.Types.ObjectId("644667cdc80389bc14956b03"),
      role_id: new mongoose.Types.ObjectId("64467970b3e320db6f805203"),
    },
  ];
  try {
    const user = await AdminRole.findOne({ admin_id: "644667cdc80389bc14956b01" });
    if (user) {
      return console.log("Admin Role already seeded");
    } else {
      // Loop through the users data array and create new user documents
      for (const userData of usersData) {
        const user = new AdminRole(userData);
        await user.save(); // Save each user document to the database
      }
      console.log("Admin Role seeded successfully.");
    }
  } catch (err) {
    console.error("Error seeding Admin Role:", err);
  }
};
