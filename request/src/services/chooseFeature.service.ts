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

const chooseFeatures = async (
  selectedFeatures: string
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(selectedFeatures))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  // query untuk get all users yang belum terdaftar

  return apiResponse(status.OK, "SUCCESS", "");
};

export default chooseFeatures;
