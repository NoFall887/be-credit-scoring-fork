import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import Feature from "../models/featureName.model";

if (!process.env.MONGO_URI) {
  throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

const usersData = [
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900810"),
    number: 1,
    is_primary: false,
    name: "AI Automation",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900811"),
    number: 2,
    is_primary: false,
    name: "AI Document Verification",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900812"),
    number: 3,
    is_primary: false,
    name: "AI Location and Movement",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900813"),
    number: 4,
    is_primary: false,
    name: "AI Capacity and Earning Power",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900814"),
    number: 5,
    is_primary: false,
    name: "AI Capital Strength and Analysis",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900815"),
    number: 6,
    is_primary: false,
    name: "AI Collateral and Guarantee",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900816"),
    number: 7,
    is_primary: false,
    name: "AI Condition Analysis",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900817"),
    number: 8,
    is_primary: false,
    name: "AI Constraint Analysis",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900818"),
    number: 9,
    is_primary: false,
    name: "AI Legal and Permit Analysis",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900819"),
    number: 10,
    is_primary: false,
    name: "AI Credit Need and Purpose",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900820"),
    number: 11,
    is_primary: false,
    name: "AI Digital Footprint",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900821"),
    number: 12,
    is_primary: false,
    name: "AI Character Analysis",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900822"),
    number: 13,
    is_primary: true,
    name: "AI Identity Scoring",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900823"),
    number: 14,
    is_primary: true,
    name: "AI Character Scoring",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900824"),
    number: 15,
    is_primary: true,
    name: "AI Capability Scoring",
  },
  {
    _id: new mongoose.Types.ObjectId("6446421682fac8d119900825"),
    number: 16,
    is_primary: true,
    name: "AI Credit Scoring",
  },
];

// Seed the User data to the database
export const featureSeeder = async () => {
  // Loop through the roles data array and create new Role documents
  const user = await Feature.findOne({});
  if (user) {
    return console.log("Features already seeded");
  } else {
    for (const userData of usersData) {
      const user = new Feature(userData);
      await user.save(); // Save each Role user to the database
    }
    console.log("Features seeded successfully.");
  }
};
