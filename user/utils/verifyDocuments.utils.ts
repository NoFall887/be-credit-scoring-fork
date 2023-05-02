import { HttpExceptionBadRequest } from "common-credit-scoring";
import UserDocument from "../src/models/document.model";

export default async function verifyDocument(userId: string) {
  const foundDocument = await UserDocument.findOne({ user_id: userId }).exec();

  if (!foundDocument) {
    throw new HttpExceptionBadRequest("user not found!");
  }

  return foundDocument;
}
