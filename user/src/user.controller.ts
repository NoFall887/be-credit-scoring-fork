import { createUser, deleteUser } from "./services/user.service";
import {
  IdentityScoringDocsInt,
  // IdentityScoringDocsUrlsInt
} from "./../interfaces/user.interface";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { updateIdentityScoringDocs } from "./services/identityScoring.service";
import { createCharacterScoringDocs } from "./services/characterScoring.service";

class UserController {
  public documentIdentityScoring = expressAsyncHandler(async (req: Request, res: Response) => {
    req.files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    } as IdentityScoringDocsInt;

    const response = await createUser(req.files as IdentityScoringDocsInt);
    res.status(response.code).json(response);
  });

  public updateDocumentIdentityScoring = expressAsyncHandler(
    async (req: Request<{ id: string }>, res: Response) => {
      req.files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const response = await updateIdentityScoringDocs(req.params.id, req.files);
      res.status(response.code).json(response);
    },
  );

  public createCharacterScoringDocs = expressAsyncHandler(
    async (req: Request<{ id: string }>, res: Response) => {
      req.files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const response = await createCharacterScoringDocs(req.params.id, req.files);
      res.status(response.code).json(response);
    },
  );

  public createCapabilityScoring = expressAsyncHandler(
    async (req: Request<{ id: string }>, res: Response) => {
      req.files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const response = await createCharacterScoringDocs(req.params.id, req.files);
      res.status(response.code).json(response);
    },
  );

  public deleteUser = expressAsyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const response = await deleteUser(req.params.id);
    res.status(response.code).json(response);
  });
}

export default UserController;
