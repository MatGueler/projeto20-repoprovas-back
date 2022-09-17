import * as testRepository from "../Repositories/TestRepository";
import dotenv from "dotenv";
import { IDataTest } from "../Types/TestsTypes";
import { wrongSchemaError } from "../Utils/errorUtils";

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
    throw wrongSchemaError("This category doesn't exist");
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
