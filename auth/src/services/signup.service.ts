import Admin from "../models/admin.model";
import Role from "../models/role.model";
import AdminRole from "../models/adminRole.model";
import { StatusCodes as status } from "http-status-codes";
import { RegisterUserDto } from "../dtos/auth.dto";
import { hashPassword } from "../utils/passwordHasher.util";
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
  const findUser = await Admin.findOne({ email: userData.email });
  if (findUser) throw new HttpExceptionForbidden("Email already registered");

  // hashing pw
  const hashed = await hashPassword(userData.password);

  const userPayload = {
    email: userData.email,
    fullname: userData.fullname,
    password: hashed,
  };

  const role = await Role.findOne({ name: "ADMIN" });
  if (!role) throw new HttpExceptionNotFound("Role 'ADMIN' not found");

  // create user to db
  const newUser = await Admin.create(userPayload);

  const userRolePayload = {
    admin_id: newUser.id,
    role_id: role?.id,
  };

  // asign user and role to db
  await AdminRole.create(userRolePayload);

  return apiResponse(
    status.CREATED,
    "SUCCESS",
    "Success created a new account"
  );
};

export default signup;
