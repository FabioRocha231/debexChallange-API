import { Request, Response, NextFunction } from "express";
import AthletsService from "../services/athletsService";
import Controller, { Methods } from "../typings/Controller";

export default class AthletesController extends Controller {
  path = "/";
  routes = [
    {
      path: "/athlets/:id",
      method: Methods.GET,
      handler: this.handleAthlets,
      localMidleware: [],
    }
  ];

  constructor() {
    super();
  }

  async handleAthlets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;
      console.log(id)
      const athletsService = new AthletsService().fetchAthlets(id);
      if(athletsService.success) {
        super.sendSuccess(res, athletsService.data!, athletsService.message);
      } else {
        super.sendError(res, athletsService.message);
      }
    } catch (error) {
      super.sendError(res, "internal server error");
    }
  }
}