import { uploadImage } from "./../middleware/multerUpload.middleware";
import express from "express";
import { authenticate, authorize, validationMiddleware } from "common-credit-scoring";
import UserController from "./user.controller";

const userController = new UserController();

const router = express.Router();
const prefix = "/user";

// multer middlewares
const identityScoringMulter = uploadImage.fields([
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

export { router as UserRouter };
