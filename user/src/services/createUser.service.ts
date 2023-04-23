import User from "models/user.model";
import { StatusCodes as status } from "http-status-codes";
import { ApiResponseInterface, apiResponse } from "common-credit-scoring";
import UserDocument from "models/document.model";
import { IdentityScoringDocsUrlsInt } from "../../interfaces/user.interface";

const createUser = async (imageUrls: IdentityScoringDocsUrlsInt): Promise<ApiResponseInterface> => {
  const user = await User.create();
  const userId = user[0].id as string;

  await UserDocument.create({
    user_id: userId,
    ...imageUrls,
  });

  return apiResponse(status.OK, "SUCCESS", "User created!");
};

export default createUser;
