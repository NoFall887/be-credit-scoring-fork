import express from "express";
import { authenticate, validationMiddleware } from "common-credit-scoring";
import QuotaController from "./quota.controller";

const quotaC = new QuotaController();

const router = express.Router();

router.post("/request", authenticate, quotaC.createRequest);
router.get("/request", quotaC.viewRequest);

export { router as QuotaRouter };
