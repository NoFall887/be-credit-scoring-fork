import express from "express";
import { authenticate, validationMiddleware } from "common-credit-scoring";
import AuthController from "./auth.controller";
import { LoginUserDto, RegisterUserDto } from "./dtos/auth.dto";

const AuthC = new AuthController();

const router = express.Router();

router.get("/me", authenticate, AuthC.me);
router.post("/signup", validationMiddleware(RegisterUserDto), AuthC.signup);
router.post("/signin", validationMiddleware(LoginUserDto), AuthC.signin);
router.post("/signout", AuthC.signout);

export { router as AuthRouter };
