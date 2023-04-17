import mongoose, { Schema, Document } from "mongoose";

interface IFeature extends Document {
  name: string;
  number: number;
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
});

const Feature = mongoose.model<IFeature>("features", FeatureSchema);

export default Feature;
