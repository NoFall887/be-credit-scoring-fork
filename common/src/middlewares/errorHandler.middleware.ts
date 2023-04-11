import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse.utils";
import { ErrorInterface } from "../interfaces/error.interface";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "../utils/httpExceptions.utils";

export const errorHandler = async (
  error: ErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
  try {
    if (error instanceof HttpException) {
      const code = error.code || 500;
      const status = error.status || "INTERNAL_SERVER_ERROR";
      const message = error.message;

      return res.status(code).json(apiResponse(code, status, message));
    }
    console.log("error :", error);
    console.log("error.parent :", error.parent);
    // Mongoose error handling
    if (error.code === 11000)
      return res
        .status(StatusCodes.CONFLICT)
        .json(apiResponse(StatusCodes.CONFLICT, "CONFLICT", error.message));

    // jwt error handler
    if (error.name)
      switch (error.name) {
        case "JsonWebTokenError": {
          const message = "Invalid or Expired token. Please login again.";
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(
              apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message)
            );
        }
        case "TokenExpiredError": {
          const message = "Invalid or Expired Token. Please login again.";
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(
              apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message)
            );
        }
      }

    const code = error.code || 500;
    const status = error.status || "INTERNAL_SERVER_ERROR";
    const message = error.message;

    // if (code === 500) {
    //   await ErrorLog.create({
    //     code,
    //     status,
    //     message,
    //   });
    //   return res.status(code).json(apiResponse(code, status, message));
    // }

    return res.status(code).json(apiResponse(code, status, message));
  } catch (err) {
    // plis jangan diubah2 ya syg
    next(err);
  }
};
