import mongoose, { Schema, Document } from "mongoose";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  roleId: string;
}

const AdminSchema: Schema = new Schema(
  {
    name: {
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

const Admin = mongoose.model<IAdmin>("admins", AdminSchema);

export default Admin;
