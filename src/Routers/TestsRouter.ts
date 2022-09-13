import { Router } from "express";
import { CreateTest } from "../Controllers/TestsController";
import { validateSchema } from "../Middlewares/validateSchemaMiddleware";
import { validatingToken } from "../Middlewares/ValidateToken";
import TestSchema from "../Schemas/TestSchema";

// import { validateSchema } from "../Middlewares/validateSchemaMiddleware";
// import { validatingToken } from "../Middlewares/ValidateToken";
// import CardSchema from "../Schemas/CardSchema";

const TestRouter = Router();

TestRouter.use(validatingToken);
TestRouter.post("/test", validateSchema(TestSchema), CreateTest);

export default TestRouter;
