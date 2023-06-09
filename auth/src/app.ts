import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { AuthRouter } from "./auth.route";
import { HttpExceptionNotFound, errorHandler } from "common-credit-scoring";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

// // Middleware untuk akses ke session dalam request
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.locals.currentUser = req.session?.user; // Menyimpan data user dalam res.locals.currentUser
//   next();
// });

app.use("/api/auth", AuthRouter);

app.get("/api/auth", (req, res) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    message: "welcome to credit scoring auth api",
  });
});

app.use(async () => {
  throw new HttpExceptionNotFound("Could not find from this resource");
});

app.use(errorHandler);

export { app };
