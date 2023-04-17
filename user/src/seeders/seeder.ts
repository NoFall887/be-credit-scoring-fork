import mongoose from "mongoose";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import User from "models/user.model";

if (!process.env.MONGO_URI) {
    throw new HttpExceptionBadRequest("MONGO_URI must be defined");
}
mongoose.connect(process.env.MONGO_URI);

const usersData = [
    {
        name: "bambang",
    },
    {
        name: "bambangs",
    },
];

// Seed the User data to the database
export const roleSeeder = async () => {
    // Loop through the roles data array and create new Role documents
    for (const userData of usersData) {
        const user = new User(userData);
        await user.save(); // Save each Role document to the database
    }
    console.log("User seeded successfully.");
};
