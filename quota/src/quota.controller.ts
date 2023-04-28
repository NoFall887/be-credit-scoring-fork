import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import createRequest from "./services/createRequest.service";
import { CreateRequestInterface } from "./quota.interface";
import viewRequest from "./services/viewRequest.service";

class UserController {
  public createRequest = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userData = req.body as CreateRequestInterface;
    const userId = req.user?.user_id as string;
    const requestServiceResponse = await createRequest(userData, userId);
    res.status(requestServiceResponse.code).json(requestServiceResponse);
  });
  public viewRequest = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // const userData = req.body;
    const requestServiceResponse = await viewRequest();
    res.status(requestServiceResponse.code).json(requestServiceResponse);
  });
}

export default UserController;
