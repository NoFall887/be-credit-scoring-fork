import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { requestRouter } from "./request.route";
import { HttpExceptionNotFound, errorHandler } from "common-credit-scoring";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/request", requestRouter);

app.get("/api/request", (req, res) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    message: "welcome to credit scoring request api",
  });
});

app.all("*", async () => {
  throw new HttpExceptionNotFound("Could not find from this resource");
});

app.use(errorHandler);

export { app };
