import { HttpExceptionBadRequest } from "common-credit-scoring";
import { v4 as uuidv4 } from "uuid";
import { Multer } from "multer";
import cloudinary from "./cloudinary.utils";
import _ from "lodash";

export async function uploadMultiple(
  files: { [fieldname: string]: Express.Multer.File[] },
  identifier: string,
  folderPrefix: string,
) {
  const images: string[] = [];
  const uploadedCount = Object.keys(files).length;
  if (uploadedCount) {
    _.times(uploadedCount, (): void => {
      images.push(`${folderPrefix}_${uuidv4()}`);
    });
  }

  const secureUrls: {
    [key: string]: string;
  } = {};

  const uploadPromises: Promise<unknown>[] = [];
  const folder_prefix = `${folderPrefix}/${identifier}/`;

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

  return secureUrls;
}
