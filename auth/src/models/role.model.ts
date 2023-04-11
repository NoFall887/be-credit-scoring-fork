import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
  name: string;
}

const RoleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model<IRole>("roles", RoleSchema);

export default Role;
