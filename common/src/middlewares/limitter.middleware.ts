import { rateLimit } from "express-rate-limit";
import { HttpExceptionTooManyRequests } from "../utils/httpExceptions.utils";

export const limitter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 600, // limit each IP to 1000 requests per windowMs
  keyGenerator: (req) => {
    return req.ip + req.headers["user-agent"]; // Menggabungkan alamat IP dan user agent sebagai kunci unik
  },
  handler: () => {
    throw new HttpExceptionTooManyRequests(
      "Too many requests, please try again later."
    );
  },
});

export const passwordResetLimit = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => {
    return req.ip + req.headers["user-agent"]; // Menggabungkan alamat IP dan user agent sebagai kunci unik
  },
  handler: () => {
    throw new HttpExceptionTooManyRequests(
      "Too many requests from this IP, please try again after 3 minutes"
    );
  },
});
