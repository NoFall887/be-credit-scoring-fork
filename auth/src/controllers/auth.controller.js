const User = require("../models/user.model");
const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { hashPassword } = require("../utils/bcrypt.utils");
const { HttpExceptionBadRequest } = require("../exceptions/httpExceptions");

module.exports = {
  signup: expressAsyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    const isEmailExist = await User.findOne({ email: email });
    console.log(isEmailExist);
    if (isEmailExist) throw new HttpExceptionBadRequest("Email already exists");

    const hashed = await hashPassword(password);

    const newUser = await User.create({ fullname, email, password: hashed });

    res
      .status(StatusCodes.CREATED)
      .json(
        apiResponse(
          StatusCodes.CREATED,
          "CREATED",
          "Success register new user",
          { user: newUser }
        )
      );
  }),
};
