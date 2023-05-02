import { uploadImage } from "./../middleware/multerUpload.middleware";
import express from "express";
// import { authenticate, authorize, validationMiddleware } from "common-credit-scoring";
import UserController from "./user.controller";

const userController = new UserController();

const router = express.Router();
const prefix = "/user";

// multer middlewares
const commonMulterFields = [
  {
    name: "ktp",
    maxCount: 1,
  },
  {
    name: "selfie",
    maxCount: 1,
  },
  {
    name: "surat_nomor_induk_berusaha",
    maxCount: 1,
  },
  {
    name: "surat_izin_usaha_perdagangan",
    maxCount: 1,
  },
  {
    name: "surat_nomor_akta_notaris",
    maxCount: 1,
  },
  {
    name: "surat_keterangan_domisili_usaha",
    maxCount: 1,
  },
  {
    name: "npwp",
    maxCount: 1,
  },
  {
    name: "surat_tanda_daftar_perusahaan",
    maxCount: 1,
  },
];

const identityScoringMulter = uploadImage.fields(commonMulterFields);
const charecterScoringMulter = uploadImage.fields([
  ...commonMulterFields,
  {
    name: "surat_laporan_keuangan",
    maxCount: 1,
  },
  {
    name: "form_credit_applicant",
    maxCount: 1,
  },
  {
    name: "surat_kepemilikian_kendaraan",
    maxCount: 1,
  },
  {
    name: "nota_kepemilikan_rumah",
    maxCount: 1,
  },
  {
    name: "nota_kepemilikan_saham",
    maxCount: 1,
  },
]);
const capabilityScoringMulter = uploadImage.fields([
  ...commonMulterFields,
  {
    name: "form_credit_applicant",
    maxCount: 1,
  },
  {
    name: "surat_laporan_keuangan",
    maxCount: 1,
  },
]);
router.post(
  `${prefix}/identity-scoring`,
  identityScoringMulter,
  userController.documentIdentityScoring,
);

router.put(
  `${prefix}/identity-scoring/:id`,
  identityScoringMulter,
  userController.updateDocumentIdentityScoring,
);

router.post(
  `${prefix}/character-scoring/:id`,
  charecterScoringMulter,
  userController.createCharacterScoringDocs,
);

router.post(
  `${prefix}/capability-scoring/:id`,
  capabilityScoringMulter,
  userController.createCapabilityScoring,
);

router.get(`${prefix}/documents/:id`, userController.getDocuments);

router.delete(`${prefix}/:id`, identityScoringMulter, userController.deleteUser);

export { router as UserRouter };
