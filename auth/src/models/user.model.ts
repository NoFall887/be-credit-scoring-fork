import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  avatar?: string;
  roleId: string;
}

const UserSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
