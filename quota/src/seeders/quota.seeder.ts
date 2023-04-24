import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import Quota from "../models/quota.model";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

const usersData = [
  {
    request_number: "00007821",
    feature_id: new mongoose.Types.ObjectId("6446421682fac8d119900823"),
    quantity: 1000,
    status: "PROCESS",
    requested_by: new mongoose.Types.ObjectId("644667cdc80389bc14956b01"),
  },
  {
    request_number: "00007822",
    feature_id: new mongoose.Types.ObjectId("6446421682fac8d119900823"),
    quantity: 5000,
    status: "SUCCESS",
    requested_by: new mongoose.Types.ObjectId("644667cdc80389bc14956b01"),
  },
  {
    request_number: "00007821",
    feature_id: new mongoose.Types.ObjectId("6446421682fac8d119900824"),
    quantity: 1000,
    status: "PROCESS",
    requested_by: new mongoose.Types.ObjectId("644667cdc80389bc14956b01"),
  },
];

// Seed the User data to the database
export const quotaSeeder = async () => {
  // Loop through the roles data array and create new Role documents
  const user = await Quota.findOne({});
  if (user) {
    return console.log("user already seeded");
  } else {
    for (const userData of usersData) {
      const user = new Quota(userData);
      await user.save(); // Save each Role user to the database
    }
    console.log("User seeded successfully.");
  }
};
