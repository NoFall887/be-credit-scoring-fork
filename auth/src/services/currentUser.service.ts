import User from "../models/user.model";
import Role from "../models/role.model";
import UserRole from "../models/userRole.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  HttpExceptionNotFound,
  JwtInterface,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";

const currentUser = async (
  user: JwtInterface
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(user))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  const findUser = await User.findOne({ id: user.user_id });
  const findRole = await Role.findOne({ id: user.role_id });
  if (!findUser || !findRole)
    throw new HttpExceptionNotFound("User or Role not found");

  return apiResponse(status.OK, "SUCCESS", "Success get a user", findUser);
};

export default currentUser;
