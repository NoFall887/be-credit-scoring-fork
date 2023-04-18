import express from "express";
import { authenticate, validationMiddleware } from "common-credit-scoring";
import UserController from "./user.controller";

const userController = new UserController();

const router = express.Router();

export { router as UserRouter };
