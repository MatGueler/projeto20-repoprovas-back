import * as testRepository from "../Repositories/TestRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import { IDataTest } from "../Types/TestsTypes";
import { unauthorizedError } from "../Utils/errorUtils";

dotenv.config();

export async function newTest(data: IDataTest, userId: number) {
  const teacherDisciplineId = await testRepository.disciplineByName(
    data.discipline,
    data.teacher
  );
  const category = await verifyCategoryExist(data.category);
  const createTest = await testRepository.CreateTest({
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDisciplineId.id,
  });
}

async function verifyCategoryExist(name: string) {
  const category = await testRepository.categoryByName(name);
  if (!category) {
    throw unauthorizedError("This category doesn't exist");
  }
  return category;
}

export async function getAllTestsByDisciplines() {
  let tests = await testRepository.getAllTestsByDisciplines();
  return tests;
}

export async function getAllTestsByTeachers() {
  let tests = await testRepository.getAllTestsByTeachers();
  return tests;
}

// export async function deleteCardById(id: number, userId: number) {
//   const noteById = await repository.getCardById(id);
//   await verifyCardNoExist(noteById);
//   await verifyUserCard(noteById, userId);
//   await repository.deleteCardById(id);
// }

// function encryptString(password: string) {
//   const SECRET_KEY_CRYPTR = String(process.env.SECRET_KEY_CRYPTR);
//   const cryptr = new Cryptr(SECRET_KEY_CRYPTR);
//   const encryptedString = cryptr.encrypt(password);
//   return encryptedString;
// }

// async function verifyCardNoExist(card: ICrads | null) {
//   if (!card) {
//     throw { code: "Unauthorized", message: "This card doesn't exist" };
//   }
// }

// async function verifyUserCard(note: ICrads | null, userId: number) {
//   if (note?.userId !== userId) {
//     throw { code: "Unauthorized", message: "This note doesn't your" };
//   }
// }
