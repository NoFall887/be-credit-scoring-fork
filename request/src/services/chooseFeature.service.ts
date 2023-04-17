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

interface UserRequest {
    user_id: string;
    feature_id: any;
    status: string;
  }

const chooseFeatures = async (
  selectedFeatures
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(selectedFeatures))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

    // query untuk get all users yang belum terdaftar
    const requested = []
    selectedFeatures.forEach(feat => {
        const newUserReq = {
            user_id: "user_id" ,
            feature_id: feat,
            status: "PROCESS"
        }
    });
    

  return apiResponse(status.OK, "SUCCESS", "");
};

export default chooseFeatures;
