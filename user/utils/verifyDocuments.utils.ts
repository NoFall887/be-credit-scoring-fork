import { HttpExceptionBadRequest } from "./../../common/src/utils/httpExceptions.utils";
import UserDocument from "../src/models/document.model";

export default async function verifyDocument(userId: string) {
  const foundDocument = await UserDocument.findOne({ user_id: userId }).exec();

  if (!foundDocument) {
    throw new HttpExceptionBadRequest("user not found!");
  }

  return foundDocument;
}
