import mongoose, { Schema, Document } from "mongoose";

interface IUserSession extends Document {
  user_id: string;
  status: string;
  user_agent: string;
  token: string;
}

const UserSessionSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
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

const UserSession = mongoose.model<IUserSession>(
  "user_sessions",
  UserSessionSchema
);

export default UserSession;
