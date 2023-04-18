import mongoose, { Schema, Document } from "mongoose";

interface IKtp extends Document {
    name: string;
    nik: string;
    age: string;
    gender: string;
    address: string;
    rt: string;
    rw: string;
    photo: string;
}

const KtpSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nik: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["0", "1"],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        rt: {
            type: String,
            required: true,
        },
        rw: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const KTP = mongoose.model<IKtp>("ktp", KtpSchema);

export default KTP;
