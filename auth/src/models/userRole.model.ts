import mongoose, { Schema, Document } from "mongoose";

interface IUserRole extends Document {
  user_id: string;
  role_id: string;
}

const UserRoleSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
});

const UserRole = mongoose.model<IUserRole>("user_roles", UserRoleSchema);

export default UserRole;
