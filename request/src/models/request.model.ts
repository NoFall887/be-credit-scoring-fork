import mongoose, { Schema, Document } from "mongoose";

interface IRequest extends Document {
  user_request_id: ArrayBuffer;
  number: string;
}

const RequestSchema: Schema = new Schema({
  user_request_id: {
    type: Schema.Types.ObjectId,
    ref: "user_requests",
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

RequestSchema.virtual("user_requests", {
  ref: "user_requests",
  localField: "user_requests_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

const Request = mongoose.model<IRequest>("requests", RequestSchema);

export default Request;
