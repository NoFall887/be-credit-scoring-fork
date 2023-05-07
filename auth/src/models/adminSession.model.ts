import mongoose, { Schema, Document } from "mongoose";

interface IAdminSession extends Document {
  admin_id: string;
  status: string;
  user_agent: string;
  token: string;
}

const AdminSessionSchema: Schema = new Schema({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "admins",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user_agent: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const AdminSession = mongoose.model<IAdminSession>(
  "admin_sessions",
  AdminSessionSchema
);

export default AdminSession;
