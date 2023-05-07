import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import User from "../models/user.model";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

const usersData = [
  {
    _id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    name: "JOHN DOE",
    document_id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
  },
  {
    _id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    name: "ALEX",
    document_id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902231"),
  },
];

// Seed the User data to the database
export const userSeeder = async () => {
  // Loop through the roles data array and create new Role documents
  const user = await User.findOne({});
  if (user) {
    return console.log("user already seeded");
  } else {
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save(); // Save each Role user to the database
    }
    console.log("User seeded successfully.");
  }
};
