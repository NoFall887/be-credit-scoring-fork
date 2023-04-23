import { Multer } from "multer";
import "express";

export type IdentityScoringDocsInt = {
  ktp: Express.Multer.File[];
  surat_nomor_induk_berusaha: Express.Multer.File[];
  surat_izin_usaha_perdagangan: Express.Multer.File[];
  surat_nomor_akta_notaris: Express.Multer.File[];
  surat_keterangan_domisili_usaha: Express.Multer.File[];
  selfie: Express.Multer.File[];
  npwp: Express.Multer.File[];
  surat_tanda_daftar_perusahaan: Express.Multer.File[];
};
export type IdentityScoringDocsUrlsInt = {
  ktp: string;
  surat_nomor_induk_berusaha: string;
  surat_izin_usaha_perdagangan: string;
  surat_nomor_akta_notaris: string;
  surat_keterangan_domisili_usaha: string;
  selfie: string;
  npwp: string;
  surat_tanda_daftar_perusahaan: string;
};
