import { faker } from "@faker-js/faker";

async function createTestFactory() {
  const test = {
    name: faker.name.fullName(),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "HTML e CSS",
    teacher: "Diego Pinho",
  };
  return test;
}

const testFactory = {
  createTestFactory,
};

export default testFactory;
