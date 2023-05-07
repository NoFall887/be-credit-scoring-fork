import mongoose, { Schema, Document } from "mongoose";

interface IUserRequest extends Document {
  user_id: string;
  feature_id: string;
  result_id: string;
  document: string;
  status: string;
}

const UserRequestSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  feature_id: {
    type: Schema.Types.ObjectId,
    ref: "features",
    required: true,
  },
  result_id: {
    type: Schema.Types.ObjectId,
    ref: "results",
  },
  status: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

UserRequestSchema.virtual("users", {
  ref: "users",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

UserRequestSchema.virtual("features", {
  ref: "features",
  localField: "feature_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

UserRequestSchema.virtual("results", {
  ref: "results",
  localField: "result_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

const UserRequest = mongoose.model<IUserRequest>(
  "user_requests",
  UserRequestSchema
);

export default UserRequest;
