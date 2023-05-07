import mongoose, { Schema, Document } from "mongoose";

interface IFeature extends Document {
  name: string;
  number: number;
  is_primary: boolean;
}

const FeatureSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  is_primary: {
    type: Boolean,
    required: true,
  },
});

const Feature = mongoose.model<IFeature>("features", FeatureSchema);

export default Feature;
