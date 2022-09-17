import prisma from "../src/Database/prisma";

async function main() {
  await createTerms();
  await createCategories();
  await createTeachers();
  await createDisciplines();
  await createTeachersDisciplines();
}
async function createTerms() {
  await prisma.terms.upsert({
    where: { number: 1 },
    update: {},
    create: { number: 1 },
  });
  await prisma.terms.upsert({
    where: { number: 2 },
    update: {},
    create: { number: 2 },
  });
  await prisma.terms.upsert({
    where: { number: 3 },
    update: {},
    create: { number: 3 },
  });
  await prisma.terms.upsert({
    where: { number: 4 },
    update: {},
    create: { number: 4 },
  });
  await prisma.terms.upsert({
    where: { number: 5 },
    update: {},
    create: { number: 5 },
  });
  await prisma.terms.upsert({
    where: { number: 6 },
    update: {},
    create: { number: 6 },
  });
}

async function createCategories() {
  await prisma.categories.upsert({
    where: { name: "Projeto" },
    update: {},
    create: { name: "Projeto" },
  });
  await prisma.categories.upsert({
    where: { name: "Prática" },
    update: {},
    create: { name: "Prática" },
  });
  await prisma.categories.upsert({
    where: { name: "Recuperação" },
    update: {},
    create: { name: "Recuperação" },
  });
}

async function createTeachers() {
  await prisma.teachers.upsert({
    where: { name: "Diego Pinho" },
    update: {},
    create: { name: "Diego Pinho" },
  });
  await prisma.teachers.upsert({
    where: { name: "Bruna Hamori" },
    update: {},
    create: { name: "Bruna Hamori" },
  });
}

async function createDisciplines() {
  await prisma.disciplines.upsert({
    where: { name: "HTML e CSS" },
    update: {},
    create: { name: "HTML e CSS", termId: 1 },
  });
  await prisma.disciplines.upsert({
    where: { name: "JavaScript" },
    update: {},
    create: { name: "JavaScript", termId: 2 },
  });
  await prisma.disciplines.upsert({
    where: { name: "React" },
    update: {},
    create: { name: "React", termId: 3 },
  });
  await prisma.disciplines.upsert({
    where: { name: "Humildade" },
    update: {},
    create: { name: "Humildade", termId: 1 },
  });
  await prisma.disciplines.upsert({
    where: { name: "Planejamento" },
    update: {},
    create: { name: "Planejamento", termId: 2 },
  });
  await prisma.disciplines.upsert({
    where: { name: "Autoconfiança" },
    update: {},
    create: { name: "Autoconfiança", termId: 3 },
  });
}

async function createTeachersDisciplines() {
  await prisma.teachersDisciplines.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 1, disciplineId: 2 },
      { teacherId: 1, disciplineId: 3 },
      { teacherId: 2, disciplineId: 4 },
      { teacherId: 2, disciplineId: 5 },
      { teacherId: 2, disciplineId: 6 },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
