/* eslint-disable @typescript-eslint/no-namespace */
import { TokenPayload, JwtInterface } from "../interfaces/token.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtInterface;
    }
  }
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  const payload = jwt.verify(token, SECRET_KEY) as TokenPayload;
  return payload;
};
