import { Request, Response } from "express";
import * as testService from "../Services/TestService";
import { IDataTest } from "../Types/TestsTypes";

export async function CreateTest(req: Request, res: Response) {
  const userId = res.locals.user;
  const dataTest: IDataTest = req.body;
  await testService.newTest(dataTest, userId);
  res.sendStatus(201);
}

export async function getAllTestsByDisciplines(req: Request, res: Response) {
  const test = await testService.getAllTestsByDisciplines();
  res.status(200).send(test);
}

// export async function getAllCards(req: Request, res: Response) {
//   const userId = res.locals.userId;
//   const cards = await service.getAllCards(userId);
//   res.status(200).send(cards);
// }

// export async function deleteCardById(req: Request, res: Response) {
//   const { id } = req.params;
//   const userId = res.locals.userId;
//   await service.deleteCardById(Number(id), userId);
//   res.sendStatus(200);
// }