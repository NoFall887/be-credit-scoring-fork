import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import UserDocument from "../models/document.model";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

const usersData = [
  {
    _id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
    user_id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
  },
  {
    _id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902231"),
    user_id: new mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
  },
];

// Seed the User data to the database
export const documentSeeder = async () => {
  // Loop through the roles data array and create new  documents
  const document = await UserDocument.findOne({});
  if (document) {
    return console.log("document already seeded");
  } else {
    // Loop through the documents data array and create new  documents
    for (const userData of usersData) {
      const document = new UserDocument(userData);
      await document.save(); // Save each document document to the database
    }
  }

  console.log("Document seeded successfully.");
};
