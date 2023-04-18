import mongoose, { Schema, Document } from "mongoose";

interface IDocument extends Document {
    ktp: string;
    selfie: string;
    surat_nomor_induk_berusaha: string;
    surat_izin_usaha_perdagangan: string;
    surat_nomor_akta_notaris: string;
    surat_keterangan_domisili_usaha: string;
    surat_npwp: string;
    surat_tanda_daftar_perusahaan: string;
    surat_laporan_keuangan: string;
    form_credit_applicant: string;
    surat_kepemilikan_kendaraan: string;
    nota_kepemilikan_saham: string;
}

const DocumentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nik: {
            type: String,
            required: true,
        },
        selfie: {
            type: String,
            required: true,
        },
        surat_nomor_induk_berusaha: {
            type: String,
            required: true,
        },
        surat_izin_usaha_perdagangan: {
            type: String,
            required: true,
        },
        surat_nomor_akta_notaris: {
            type: String,
            required: true,
        },
        surat_keterangan_domisili_usaha: {
            type: String,
            required: true,
        },
        surat_npwp: {
            type: String,
            required: true,
        },
        surat_tanda_daftar_perusahaan: {
            type: String,
            required: true,
        },
        surat_laporan_keuangan: {
            type: String,
            required: true,
        },
        form_credit_applicant: {
            type: String,
            required: true,
        },
        surat_kepemilikan_kendaraan: {
            type: String,
            required: true,
        },
        nota_kepemilikan_saham: {
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

const DocumentModel = mongoose.model<IDocument>("Documents", DocumentSchema);

export default DocumentModel;
