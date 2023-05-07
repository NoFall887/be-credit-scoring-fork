import express from "express";
import { authenticate, validationMiddleware } from "common-credit-scoring";
import RequestController from "./request.controller";

const RequestC = new RequestController();

const router = express.Router();

// router.get("/me", authenticate, RequestC.me);
// router.post("/signup", validationMiddleware(RegisterUserDto), RequestC.signup);

export { router as requestRouter };
