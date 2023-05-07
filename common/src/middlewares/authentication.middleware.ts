import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/jwt.utils";
import { JwtInterface, TokenPayload } from "../interfaces/token.interface";
import { HttpExceptionUnauthorize } from "../utils/httpExceptions.utils";

// implement UserInterface to Request
export const authenticate = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bearer = req.header("Authorization");
    if (!bearer)
      throw new HttpExceptionUnauthorize("Authorization header missing");

    // check ada tokennya
    const token = bearer.split(" ")[1];
    if (!token)
      throw new HttpExceptionUnauthorize(
        "Unauthorized. Please login to continue."
      );
    const decodedToken: TokenPayload | null = verifyToken(token);

    // store ke req.user
    req.user = {
      user_id: decodedToken?.user_id,
      role_id: decodedToken?.role_id,
    } as JwtInterface;

    next();
  }
);
