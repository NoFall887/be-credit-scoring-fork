import mongoose, { Schema, Document } from "mongoose";

interface IAdminRole extends Document {
  admin_id: string;
  role_id: string;
}

const AdminRoleSchema: Schema = new Schema({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "admins",
    required: true,
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
});

const AdminRole = mongoose.model<IAdminRole>("admin_roles", AdminRoleSchema);

export default AdminRole;
