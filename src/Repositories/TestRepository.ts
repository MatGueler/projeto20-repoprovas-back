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
        orderBy: { termId: "asc" },
        include: {
          TeachersDisciplines: {
            select: {
              Tests: {
                distinct: ["categoryId"],
                select: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      Tests: {
                        select: {
                          name: true,
                          pdfUrl: true,
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
          },
        },
      },
    },
  });
  return tests;
}

export async function getAllTestsByTeachers() {
  // const tests = await prisma.teachers.findMany({
  //   include: {
  //     TeachersDisciplines: {
  //       distinct: ["disciplineId"],
  //       select: {
  //         discipline: true,
  //         Tests: {
  //           distinct: ["categoryId"],
  //           select: {
  //             category: {
  //               select: {
  //                 id: true,
  //                 name: true,
  //                 Tests: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  const tests = await prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        select: {
          discipline: true,
          Tests: {
            distinct: ["categoryId", "name"],
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  Tests: {
                    select: {
                      name: true,
                      pdfUrl: true,
                      teacherDiscipline: {
                        select: {
                          discipline: true,
                        },
                      },
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
  return tests;
}
