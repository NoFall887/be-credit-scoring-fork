import mongoose, { Schema, Document } from "mongoose";

interface IQuota extends Document {
  request_number: string;
  feature_id: string;
  quantity: number;
  status: string;
  requested_by: string;
  accepted_by: string;
}

const QuotaSchema: Schema = new Schema({
  request_number: {
    type: String,
    required: true,
  },
  feature_id: {
    type: Schema.Types.ObjectId,
    ref: "features",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "admins",
    required: true,
  },
  accepted_by: {
    type: Schema.Types.ObjectId,
    ref: "admins",
  },
});

const Quota = mongoose.model<IQuota>("quotas", QuotaSchema);

export default Quota;
