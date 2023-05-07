import { Request, Response, NextFunction } from "express";
import { HttpExceptionForbidden } from "../utils/httpExceptions.utils";

export const authorize = (requiredRole: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!Array.isArray(requiredRole)) {
      if (!user || user?.role_id !== requiredRole)
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource"
        );
    } else if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(req.user?.role_id))
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource"
        );
    }

    next();
  };
};
