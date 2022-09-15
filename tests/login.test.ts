import supertest from "supertest";
import prisma from "../src/Database/prisma";
import server from "../src/index";
import loginFactory from "./factories/loginFactory/loginFactory";
import registerFactory from "./factories/registerFactory/registerFactory";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("user test", () => {
  it("user register", async () => {
    const body = await registerFactory();
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(201);
  });

  //   it("Testa a função statusCodes retornando 200 de status", () => {
  //     const result = statusCodes(true);

  //     expect(result.status).toBe(200);
  //   });

  //   it("Testa a função statusCodes retornando 404 de status", () => {
  //     const result = statusCodes(false);

  //     expect(result.status).toBe(404);
  //   });

  //   it("Testa a função sumAllTotal", () => {
  //     const arr = [{ total: 2 }, { total: 10 }];

  //     const result = sumAllTotal(arr);

  //     expect(result).toBe(12);
  //   });
});

describe("user test", () => {
  it("user login", async () => {
    const body = await loginFactory();
    const result = await supertest(server).post(`/signin`).send(body);

    expect(result.status).toBe(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect;
});
