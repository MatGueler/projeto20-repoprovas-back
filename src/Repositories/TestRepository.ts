import prisma from "../Database/prisma";
import { ICreateTest } from "../Types/TestsTypes";

export async function disciplineByName(discipline: string, teacher: string) {
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      teacher: {
        name: teacher,
      },
      discipline: {
        name: discipline,
      },
    },
  });
  return teacherDiscipline;
}

export async function categoryByName(name: string) {
  const category = await prisma.categories.findFirst({
    where: { name },
  });
  return category;
}

export async function CreateTest(test: ICreateTest) {
  await prisma.tests.create({ data: test });
}

export async function getAllTestsByDisciplines() {
  const tests = await prisma.terms.findMany({
    include: {
      Disciplines: {
        include: {
          TeachersDisciplines: {
            include: {
              Tests: {
                include: {
                  category: true,
                  teacherDiscipline: {
                    select: {
                      teacher: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}

export async function getAllTestsByTeachers() {
  const tests = await prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        include: {
          discipline: true,
          Tests: {},
        },
      },
    },
  });
  return tests;
}

// export async function getAllCards(userId: number) {
//   const cards = await prisma.cards.findMany({
//     where: { userId },
//     include: {
//       user: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   return cards;
// }

// export async function deleteCardById(id: number) {
//   await prisma.cards.delete({ where: { id } });
// }
