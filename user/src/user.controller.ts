import { IdentityScoringDocsInt, IdentityScoringDocsUrlsInt } from "./../interfaces/user.interface";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { HttpExceptionBadRequest } from "common-credit-scoring";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import cloudinary from "../utils/cloudinary.utils";
import createUser from "services/createUser.service";

async function uploadMultiple(
  files: { [fieldname: string]: Express.Multer.File[] },
  folderPrefix: string,
) {
  const images: string[] = [];
  const uploadedCount = Object.keys(files).length;
  if (uploadedCount) {
    _.times(uploadedCount, (): void => {
      images.push(`discussions_${uuidv4()}`);
    });
  }

  const secureUrls = {};

  const uploadPromises: Promise<unknown>[] = [];
  const folder_prefix = `${folderPrefix}/${uuidv4()}/`;

  Object.keys(files).forEach((key, index) => {
    const file = files[key][0];
    const promise = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ public_id: images[index], folder: folder_prefix }, (error, result) => {
          if (error) {
            reject(new HttpExceptionBadRequest("Something went wrong with the upload file"));
          } else {
            resolve((secureUrls[key] = result?.secure_url as string));
          }
        })
        .end(file.buffer);
    });
    uploadPromises.push(promise);
  });

  return secureUrls as IdentityScoringDocsUrlsInt;
}

class UserController {
  public documentIdentityScoring = expressAsyncHandler(async (req: Request, res: Response) => {
    req.files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    } as IdentityScoringDocsInt;
    req.files;
    const imageUrls = await uploadMultiple(req.files, "user");

    const response = await createUser(imageUrls);
  });
}

export default UserController;
