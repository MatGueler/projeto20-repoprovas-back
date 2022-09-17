import { Request, Response } from "express";
import * as userService from "../Services/UserService";
import { IDataUser, ILoginUser } from "../Types/UserTypes";

export async function registerUser(req: Request, res: Response) {
  const infos: IDataUser = req.body;
  const registerUser = await userService.registerUser(infos);
  res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response) {
  const infos: ILoginUser = req.body;
  const token = await userService.loginUser(infos);
  res.status(200).send({ token });
}
