import { Router } from "express";
import {
  CreateTest,
  getAllTestsByDisciplines,
} from "../Controllers/TestsController";
import { validateSchema } from "../Middlewares/validateSchemaMiddleware";
import { validatingToken } from "../Middlewares/ValidateToken";
import TestSchema from "../Schemas/TestSchema";

const TestRouter = Router();

TestRouter.use(validatingToken);
TestRouter.post("/test", validateSchema(TestSchema), CreateTest);
TestRouter.get("/test/disciplines", getAllTestsByDisciplines);

export default TestRouter;
