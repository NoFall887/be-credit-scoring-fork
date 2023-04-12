import AdminSession from "../models/adminSession.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  HttpExceptionNotFound,
  JwtInterface,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";

const signout = async (user: JwtInterface): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(user))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  const findSession = await AdminSession.findOne({ id: user.user_id });
  if (!findSession) throw new HttpExceptionNotFound("Session not found");

  findSession.status = "EXPIRED";

  await findSession.save();

  return apiResponse(status.OK, "SUCCESS", "Success logout");
};

export default signout;
