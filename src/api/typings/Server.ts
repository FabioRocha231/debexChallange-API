import { Application, RequestHandler, Request, Response } from "express";
import http from "http";
import path from "path";
import Controller from "./Controller";

export default class Server {
  constructor(private app: Application, private readonly port: number, private database?: any) {
    this.app = app;
    this.port = port;
    this.database = database;
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`The server is running on port ${this.port}`);
    })
  }

  public loadMiddleware(middleWares: RequestHandler[]): void {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    }
    );
  }

  public loadControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    }
    );
  }
}