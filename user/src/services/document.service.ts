import { ApiResponseInterface, apiResponse } from "common-credit-scoring";
import { StatusCodes as status } from "http-status-codes";
import UserDocument from "models/document.model";
import { uploadMultiple } from "../../utils/uploader.utils";
import cloudinary from "../../utils/cloudinary.utils";
import { extractPublicId } from "cloudinary-build-url";
import verifyDocument from "../../utils/verifyDocuments.utils";

const createCapabilityScoringDocs = async (
  userId: string,
  files: { [fieldname: string]: Express.Multer.File[] },
): Promise<ApiResponseInterface> => {
  const foundDocument = await verifyDocument(userId);

  // filter image to update
  const imagesToUpdate = {};
  const imagesToUpdatePublicKey: string[] = [];

  for (let [key, value] of Object.entries(files)) {
    if (value[0].size > 0) {
      imagesToUpdate[key] = value;
      imagesToUpdatePublicKey.push(extractPublicId(foundDocument[key]));
    }
  }

  cloudinary.api.delete_resources(imagesToUpdatePublicKey, (error, result) => {
    console.log(result, error);
  });

  const updatedImages = await uploadMultiple(imagesToUpdate, userId, "user");

  const updatedDocs = await UserDocument.findOneAndUpdate({ user_id: userId }, updatedImages, {
    runValidators: true,
    new: true,
  }).exec();

  return apiResponse(status.OK, "SUCCESS", "Capability scoring documents updated!", updatedDocs);
};

const createCharacterScoringDocs = async (
  userId: string,
  files: { [fieldname: string]: Express.Multer.File[] },
): Promise<ApiResponseInterface> => {
  const foundDocument = await verifyDocument(userId);

  // filter image to update
  const imagesToUpdate = {};
  const imagesToUpdatePublicKey: string[] = [];

  for (let [key, value] of Object.entries(files)) {
    if (value[0].size > 0) {
      imagesToUpdate[key] = value;
      imagesToUpdatePublicKey.push(extractPublicId(foundDocument[key]));
    }
  }

  cloudinary.api.delete_resources(imagesToUpdatePublicKey, (error, result) => {
    console.log(result, error);
  });

  const updatedImages = await uploadMultiple(imagesToUpdate, userId, "user");

  const updatedDocs = await UserDocument.findOneAndUpdate({ user_id: userId }, updatedImages, {
    runValidators: true,
    new: true,
  }).exec();

  return apiResponse(status.OK, "SUCCESS", "Character scoring documents created!", updatedDocs);
};

const updateIdentityScoringDocs = async (
  userId: string,
  files: { [fieldname: string]: Express.Multer.File[] },
): Promise<ApiResponseInterface> => {
  const foundDocument = await verifyDocument(userId);

  // filter image to update
  const imagesToUpdate = {};
  const imagesToUpdatePublicKey: string[] = [];

  for (let [key, value] of Object.entries(files)) {
    if (value[0].size > 0) {
      imagesToUpdate[key] = value;
      imagesToUpdatePublicKey.push(extractPublicId(foundDocument[key]));
    }
  }

  cloudinary.api.delete_resources(imagesToUpdatePublicKey, (error, result) => {
    console.log(result, error);
  });

  const updatedImages = await uploadMultiple(imagesToUpdate, userId, "user");

  const updatedDocs = await UserDocument.findOneAndUpdate({ user_id: userId }, updatedImages, {
    runValidators: true,
    new: true,
  }).exec();

  return apiResponse(status.OK, "SUCCESS", "Identity scoring documents updated!", updatedDocs);
};

const getDocuments = async (userId: string): Promise<ApiResponseInterface> => {
  const foundDocument = await verifyDocument(userId);

  return apiResponse(status.OK, "SUCCESS", "Success get user's documents", foundDocument);
};

export {
  createCapabilityScoringDocs,
  createCharacterScoringDocs,
  updateIdentityScoringDocs,
  getDocuments,
};
