import Quota from "../models/quota.model";
import { StatusCodes as status } from "http-status-codes";
import {
  ApiResponseInterface,
  HttpExceptionBadRequest,
  apiResponse,
  isEmpty,
} from "common-credit-scoring";
import { CreateRequestInterface } from "../quota.interface";

const createRequest = async (
  userData: CreateRequestInterface,
  userId: string
): Promise<ApiResponseInterface> => {
  //   check data from request
  if (isEmpty(userData))
    throw new HttpExceptionBadRequest("Empty data. Please fill the form");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // const isRequestedToday = await Quota.find({ createdAt: { $gte: today } });
  // if (isRequestedToday)
  //   throw new HttpExceptionBadRequest("You already have a request for today");

  console.log(today.getTime());

  const isRequestedToday = await Quota.find()
    .where("createdAt")
    .gte(today.getTime());
  if (isRequestedToday)
    throw new HttpExceptionBadRequest("You already have a request for today");

  // looping for inserts all feature
  const choosedFeatures = userData.choosed_feature;
  const newRequests = choosedFeatures.map((featureId) => ({
    feature_id: featureId,
    request_number: "001",
    quantity: userData.quantity,
    status: "PROCESS",
    requested_by: userId,
  }));

  console.log(newRequests);

  await Quota.create(newRequests);

  return apiResponse(
    status.OK,
    "SUCCESS",
    "Your request has been successfully sent"
  );
};

export default createRequest;
