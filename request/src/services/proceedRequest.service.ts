import Feature from "../models/featureName.model";
import UserRequest from "../models/userRequest.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  HttpExceptionNotFound,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";

const proceedRequest = async (
  selectedUserRequest: string
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (!selectedUserRequest)
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  // some query to AI API

  // some query to save result and update user Request

  // some query to generate pdf

  return apiResponse(status.OK, "SUCCESS", "");
};
export default proceedRequest;
