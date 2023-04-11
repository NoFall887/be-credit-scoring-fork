import User from "../models/user.model";
import UserRole from "../models/userRole.model";
import UserSession from "../models/userSession.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  HttpExceptionForbidden,
  HttpExceptionNotFound,
  apiResponse,
  generateToken,
  isEmpty,
} from "common-credit-scoring";
import { LoginUserDto } from "../dtos/auth.dto";
import PasswordHasher from "../utils/passwordHasher.util";

const signin = async (
  userData: LoginUserDto,
  userAgent
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(userData))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  const findUser = await User.findOne({ email: userData.email });
  if (!findUser) throw new HttpExceptionNotFound("Email not found");

  const userRole = await UserRole.findOne({ user_id: findUser.id });
  if (!userRole) throw new HttpExceptionNotFound("User role not found");

  const isMatch = await PasswordHasher.comparePassword(
    userData.password,
    findUser.password
  );
  if (!isMatch) throw new HttpExceptionForbidden("Password does not match");

  // Generate JWT
  const token = await generateToken({
    user_id: userRole.user_id,
    role_id: userRole.role_id,
  });

  await UserSession.findOneAndUpdate(
    {
      user_id: userRole.user_id,
      status: "ACTIVE",
    },
    { status: "EXPIRED" }
  );

  const sessionPayload = {
    user_id: findUser.id,
    status: "ACTIVE",
    user_agent: userAgent,
    token: token,
  };

  await UserSession.create(sessionPayload);

  return apiResponse(status.OK, "OK", "Success get login", { token: token });
};

export default signin;
