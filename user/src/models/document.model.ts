import mongoose, { Schema, Document } from "mongoose";

interface UserIDocument extends Document {
  user_id: string;
  ktp: string;
  selfie: string;
  surat_nomor_induk_berusaha: string;
  surat_izin_usaha_perdagangan: string;
  surat_nomor_akta_notaris: string;
  npwp: string;
  surat_tanda_daftar_perusahaan: string;
  surat_laporan_keuangan: string;
  form_credit_applicant: string;
  surat_kepemilikian_kendaraan: string;
  nota_kepemilikan_saham: string;
  nota_kepemilikan_rumah: string;
}

const UserDocumentSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  ktp: {
    type: String,
  },
  selfie: {
    type: String,
  },
  surat_nomor_induk_berusaha: {
    type: String,
  },
  surat_izin_usaha_perdagangan: {
    type: String,
  },
  surat_nomor_akta_notaris: {
    type: String,
  },
  surat_keterangan_domisili_usaha: {
    type: String,
  },
  npwp: {
    type: String,
  },
  surat_tanda_daftar_perusahaan: {
    type: String,
  },
  surat_laporan_keuangan: {
    type: String,
  },
  form_credit_applicant: {
    type: String,
  },
  surat_kepemilikian_kendaraan: {
    type: String,
  },
  nota_kepemilikan_rumah: {
    type: String,
  },
  nota_kepemilikan_saham: {
    type: String,
  },
});

const UserDocument = mongoose.model<UserIDocument>("documents", UserDocumentSchema);

export default UserDocument;
