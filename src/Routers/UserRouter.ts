import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/UserController";
import { validateSchema } from "../Middlewares/validateSchemaMiddleware";
import { validatingToken } from "../Middlewares/ValidateToken";
import loginSchema from "../Schemas/LoginSchema";
import registerSchema from "../Schemas/RegisterSchema";

const RegisterRouter = Router();

RegisterRouter.post("/signup", validateSchema(registerSchema), registerUser);
RegisterRouter.post("/signin", validateSchema(loginSchema), loginUser);

export default RegisterRouter;
