import Quota from "../models/quota.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";

const viewRequest = async (): Promise<ApiResponseInterface> => {
  //   check data from request
  //   if (isEmpty(userData))
  // throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  const requests = await Quota.find();

  return apiResponse(
    status.OK,
    "SUCCESS",
    "Success get all quota requests",
    requests
  );
};

export default viewRequest;
