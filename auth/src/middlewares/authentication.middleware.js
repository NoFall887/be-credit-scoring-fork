const { verifyToken } = require("../utils/jwt.utils");
const { HttpExceptionUnauthorize } = require("../exceptions/httpExceptions");
const expressAsyncHandler = require("express-async-handler");

module.exports = {
  authentication: expressAsyncHandler(async (req, res, next) => {
    const bearer = req.headers["authorization"];
    if (!bearer)
      throw new HttpExceptionUnauthorize("Authorization header missing");

    const token = bearer.split(" ")[1];
    if (!token)
      throw new HttpExceptionUnauthorize(
        "Unauthorized. Please login to continue."
      );

    const decodedToken = verifyToken(token);

    req.session.user = decodedToken;

    next();
  }),
};
