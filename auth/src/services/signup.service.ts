import User from "../models/user.model";
import Role from "../models/role.model";
import UserRole from "../models/userRole.model";
import { StatusCodes as status } from "http-status-codes";
import { RegisterUserDto } from "../dtos/auth.dto";
import PasswordHasher from "../utils/passwordHasher.util";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  HttpExceptionForbidden,
  HttpExceptionNotFound,
  apiResponse,
} from "common-credit-scoring";

const signup = async (
  userData: RegisterUserDto
): Promise<ApiResponseInterface> => {
  // check data from request
  if (!userData)
    throw new HttpExceptionBadRequest(
      "Empty required data. Please fill the form"
    );

  // is email already registerd
  const findUser = await User.findOne({ email: userData.email });
  if (findUser) throw new HttpExceptionForbidden("Email already registered");

  // hashing pw
  const hashed = await PasswordHasher.hashPassword(userData.password);

  const userPayload = {
    email: userData.email,
    fullname: userData.fullname,
    password: hashed,
  };

  const role = await Role.findOne({ name: "USER" });
  if (!role) throw new HttpExceptionNotFound("Role 'USER' not found");

  // create user to db
  const newUser = await User.create(userPayload);

  const userRolePayload = {
    user_id: newUser.id,
    role_id: role?.id,
  };

  // asign user and role to db
  await UserRole.create(userRolePayload);

  return apiResponse(
    status.CREATED,
    "SUCCESS",
    "Success created a new account"
  );
};

export default signup;
