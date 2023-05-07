import mongoose from "mongoose";
import Role from "../models/role.model";
import { HttpExceptionBadRequest } from "common-credit-scoring";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

// Define an array of Role data to seed
const rolesData = [
  {
    _id: new mongoose.Types.ObjectId("64467970b3e320db6f805201"),
    name: "ADMIN",
  },
  { _id: new mongoose.Types.ObjectId("64467970b3e320db6f805202"), name: "HR" },
  {
    _id: new mongoose.Types.ObjectId("64467970b3e320db6f805203"),
    name: "GUEST",
  },
];

// Seed the Role data to the database
export const roleSeeder = async () => {
  try {
    const role = await Role.findOne({ name: "ADMIN" });
    if (role) {
      return console.log("Role already seeded");
    } else {
      // Loop through the roles data array and create new Role documents
      for (const roleData of rolesData) {
        const role = new Role(roleData);
        await role.save(); // Save each Role document to the database
      }
      console.log("Roles seeded successfully.");
    }
  } catch (err) {
    console.error("Error seeding roles:", err);
  }
};
