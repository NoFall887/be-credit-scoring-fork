import mongoose, { Schema, Document } from "mongoose";

interface IResult extends Document {
  feature_id: string;
  user_id: string;
  variable: string;
  document?: string;
}

const ResultSchema: Schema = new Schema({
  feature_id: {
    type: Schema.Types.ObjectId,
    ref: "features",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  variable: {
    type: String,
    required: true,
  },
  document: {
    type: String,
  },
});

ResultSchema.virtual("features", {
  ref: "features",
  localField: "feature_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

ResultSchema.virtual("users", {
  ref: "users",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
  options: { virtual: true },
});

const Result = mongoose.model<IResult>("results", ResultSchema);

export default Result;
