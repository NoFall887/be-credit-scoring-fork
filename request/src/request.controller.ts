import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import chooseFeatures from "./services/chooseFeature.service";
import proceedRequest from "./services/proceedRequest.service";
import {
  getAllFeature,
  getFeatureForQuota,
} from "./services/getFeature.service";

class RequestController {
  public getAllFeature = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const requestServiceResponse = await getAllFeature();
      res.status(requestServiceResponse.code).json(requestServiceResponse);
    }
  );
  public getFeatureForQuota = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const requestServiceResponse = await getFeatureForQuota();
      res.status(requestServiceResponse.code).json(requestServiceResponse);
    }
  );
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
