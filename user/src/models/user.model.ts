import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  roleId: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  document_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
