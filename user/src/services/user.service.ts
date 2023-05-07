import User from "../models/user.model";
import { StatusCodes as status } from "http-status-codes";
import { ApiResponseInterface, apiResponse } from "common-credit-scoring";
import UserDocument from "../models/document.model";
import { IdentityScoringDocsInt } from "../interfaces/user.interface";
import { uploadMultiple } from "../utils/uploader.utils";

const createUser = async (files: IdentityScoringDocsInt): Promise<ApiResponseInterface> => {
  const user = await User.create();
  const userId = user[0].id as string;
  const imageUrls = await uploadMultiple(files, userId, "user");
  const createdDocuments = await UserDocument.create({
    user_id: userId,
    ...imageUrls,
  });

  return apiResponse(status.OK, "SUCCESS", "User created!", createdDocuments);
};

const deleteUser = async (userId: string): Promise<ApiResponseInterface> => {
  await UserDocument.deleteOne({ user_id: userId });
  await User.deleteOne({ id: userId });

  return apiResponse(status.OK, "SUCCESS", "User deleted!");
};

export { createUser, deleteUser };
