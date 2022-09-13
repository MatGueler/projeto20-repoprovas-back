import { Router } from "express";
import TestRouter from "./TestsRouter";
import UserRouter from "./UserRouter";

const routes = Router();

routes.use(UserRouter);
routes.use(TestRouter);

export default routes;
