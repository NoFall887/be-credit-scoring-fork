import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import register from "./services/signup.service";
import currentUser from "./services/currentUser.service";
import signin from "./services/signin.service";
import signout from "./services/signout.service";
import { JwtInterface } from "common-credit-scoring";

import { LoginUserDto, RegisterUserDto } from "dtos/auth.dto";

class AuthController {
  public signup = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userData: RegisterUserDto = req.body;
      const userServiceResponse = await register(userData);
      res.status(userServiceResponse.code).json(userServiceResponse);
    }
  );

  public signin = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userAgent = req.get("User-Agent");
      const userData: LoginUserDto = req.body;
      const userServiceResponse = await signin(userData, userAgent);
      // Store it on session object
      req.session = {
        token: userServiceResponse.data,
      };
      res.status(200).json(userServiceResponse);
    }
  );

  public me = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = req.user as JwtInterface;
      const userServiceResponse = await currentUser(user);
      res.status(userServiceResponse.code).json(userServiceResponse);
    }
  );
  public signout = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = req.user as JwtInterface;
      const userServiceResponse = await signout(user);
      res.status(userServiceResponse.code).json(userServiceResponse);
    }
  );
}

export default AuthController;
