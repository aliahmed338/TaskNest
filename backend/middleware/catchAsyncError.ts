import { NextFunction, Request, Response } from "express";

export default (controllerFunction: (req:Request, res:Response, next:NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(controllerFunction(req, res, next)).catch(next);

// "scripts": {
//   "dev": "SET NODE_ENV=DEVELOPMENT& nodemon backend/index.ts",
//   "prod": "SET NODE_ENV=PRODUCTION& nodemon backend/index.ts",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
