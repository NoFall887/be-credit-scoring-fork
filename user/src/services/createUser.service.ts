import User from "models/user.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";

const createUser = async (): Promise<ApiResponseInterface> => {
  //   check data from request
  //   if ()
  //     throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  // query untuk get all users yang belum terdaftar

  return apiResponse(status.OK, "SUCCESS", "");
};

export default createUser;
