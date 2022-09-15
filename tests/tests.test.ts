import supertest from "supertest";
import prisma from "../src/Database/prisma";
import server from "../src/index";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("create_test tests", () => {
  //   it("user register", async () => {
  //     const body = await registerFactory();
  //     const result = await supertest(server).post(`/signup`).send(body);
  //     expect(result.status).toBe(201);
  //   });
});

describe("user test", () => {
  //   it("Try user login", async () => {
  //     console.log(`running on ${process.env.DATABASE_URL}`);
  //     const body = await loginFactory();
  //     const result = await supertest(server).post(`/signin`).send(body);
  //     expect(result.status).toBe(200);
  //   });
});

afterAll(async () => {
  await prisma.$disconnect;
});
