import { createUser } from "./services/user.service";
import { IdentityScoringDocsInt, IdentityScoringDocsUrlsInt } from "./../interfaces/user.interface";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { updateIdentityScoringDocs } from "services/identityScoring.service";

class UserController {
  public documentIdentityScoring = expressAsyncHandler(async (req: Request, res: Response) => {
    req.files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    } as IdentityScoringDocsInt;

    const response = await createUser(req.files as IdentityScoringDocsInt);
    res.status(response.code).json(response);
  });

  public updateDocumentIdentityScoring = expressAsyncHandler(
    async (req: Request<object, object, { user_id: string }>, res: Response) => {
      req.files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const response = await updateIdentityScoringDocs(req.body.user_id, req.files);
    },
  );
}

export default UserController;
