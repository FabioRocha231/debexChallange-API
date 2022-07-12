import { Response, Request, NextFunction, Router } from "express";

export enum Methods {
  ALL = "all",
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  HEAD = "head",
}

interface IRoute {
  path: string;
  method: Methods;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>;
  localMidleware: ((req: Request, res: Response, next: NextFunction) => void)[];
}

export default abstract class Controller {
  public router: Router = Router();
  public abstract path: string;
  protected abstract readonly routes: IRoute[];

  public setRoutes = (): Router => {
    for (const route of this.routes) {
      try {
        for (const mw of route.localMidleware) {
          this.router[route.method](route.path, mw);
        }
        this.router[route.method](route.path, route.handler);
      } catch (error) {
        console.error("not a valid method");
      }
    }
    return this.router;
  };

  protected sendSuccess(res: Response, data: object, message?: string) {
    return res.status(200).json({
      message: message || "success",
      data,
    });
  }

  protected sendError(res: Response, message?: string) {
    return res.status(500).json({
      message: message || "internal server error",
    });
  }
}
