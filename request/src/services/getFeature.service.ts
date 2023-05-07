import Feature from "../models/featureName.model";
import { StatusCodes as status } from "http-status-codes";
import { ApiResponseInterface, apiResponse } from "common-credit-scoring";

export const getAllFeature = async (): Promise<ApiResponseInterface> => {
  const features = await Feature.find();

  return apiResponse(
    status.OK,
    "SUCCESS",
    "Success get all features",
    features
  );
};

export const getFeatureForQuota = async (): Promise<ApiResponseInterface> => {
  const features = await Feature.find({ where: { is_primary: true } });

  return apiResponse(
    status.OK,
    "SUCCESS",
    "Success get feature for quota",
    features
  );
};
