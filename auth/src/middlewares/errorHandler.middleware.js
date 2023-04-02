const { StatusCodes } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { HttpException } = require("..//exceptions/httpExceptions");

const errorHandler = (err, req, res, next) => {
  try {
    if (err instanceof HttpException) {
      console.log(err);
      return res
        .status(err.code)
        .json(apiResponse(err.code, err.status, err.message));
    }

    // Mongoose error handling
    if (err.code === 11000 && err.keyPattern)
      // Duplicate username error
      return res
        .status(StatusCodes.CONFLICT)
        .json(apiResponse(StatusCodes.CONFLICT, "CONFLICT", err.message));

    // jwt error handler
    if (err.name)
      switch (err.name) {
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

    const code = err.code || 500;
    const status = err.status || "INTERNAL_SERVER_ERROR";
    const message = err.message;

    return res.status(code).json(apiResponse(code, status, message));
  } catch (error) {
    next(error);
  }
};

module.exports = errorHandler;
