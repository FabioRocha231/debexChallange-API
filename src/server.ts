// express
import express, { Application, RequestHandler } from 'express';

// important typings
import Server from './api/typings/Server';
import Controller from './api/typings/Controller';

// middlewares
import {json, urlencoded} from 'body-parser';

// controllers
import AthletesController from './api/controllers/athletsController';

const app : Application = express();
const server: Server = new Server(app, 3000);

const controllers: Controller[] = [
  new AthletesController(),
]

const globalMiddlewares: RequestHandler[] = [
  urlencoded({extended: true}),
  json(),
]

Promise.resolve()
  .then(() => {
    server.loadMiddleware(globalMiddlewares);
    server.loadControllers(controllers);
    server.run()
  })