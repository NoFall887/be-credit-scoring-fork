import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import chooseFeatures from "./services/chooseFeature.service";
import proceedRequest from "./services/proceedRequest.service";

class RequestController {
  public chooseFeatures = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const selectedFeatures = req.body.selectedFeatures;
      const requestServiceResponse = await chooseFeatures(selectedFeatures);
      res.status(requestServiceResponse.code).json(requestServiceResponse);
    }
  );
  public proceedRequest = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const selectedUserRequest = req.body.selectedUserRequest;
      const requestServiceResponse = await proceedRequest(selectedUserRequest);
      res.status(requestServiceResponse.code).json(requestServiceResponse);
    }
  );
}

export default RequestController;
