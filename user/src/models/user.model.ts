import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
  },
});

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
