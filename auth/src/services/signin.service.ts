import Admin from "../models/admin.model";
import AdminRole from "../models/adminRole.model";
import UserSession from "../models/adminSession.model";
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

  const findUser = await Admin.findOne({ email: userData.email });
  if (!findUser) throw new HttpExceptionNotFound("Email not found");

  const userRole = await AdminRole.findOne({ admin_id: findUser.id });
  if (!userRole) throw new HttpExceptionNotFound("User role not found");

  const isMatch = await PasswordHasher.comparePassword(
    userData.password,
    findUser.password
  );
  if (!isMatch) throw new HttpExceptionForbidden("Password does not match");

  // Generate JWT
  const token = generateToken({
    user_id: userRole.admin_id,
    role_id: userRole.role_id,
  });

  await UserSession.findOneAndUpdate(
    {
      admin_id: userRole.admin_id,
      status: "ACTIVE",
    },
    { status: "EXPIRED" }
  );

  const sessionPayload = {
    admin_id: findUser.id,
    status: "ACTIVE",
    user_agent: userAgent,
    token: token,
  };

  await UserSession.create(sessionPayload);

  return apiResponse(status.OK, "OK", "Success get login", { token: token });
};

export default signin;
