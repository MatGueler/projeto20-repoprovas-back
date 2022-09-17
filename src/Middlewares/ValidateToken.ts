import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import userService from "../Services/UserService";
dotenv.config();

import { unauthorizedError } from "../Utils/errorUtils";

export async function validatingToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError("Missing authorization header");
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    if (!token) throw unauthorizedError("Missing token");
  }
  try {
    const JWT_SECRET = String(process.env.JWT_SECRET);
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await userService.findUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw unauthorizedError("Invalid token");
  }
}
