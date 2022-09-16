import supertest from "supertest";
import prisma from "../src/Database/prisma";
import server from "../src/index";
import registerFactory from "./factories/registerFactory/registerFactory";
import testFactory from "./factories/testFactory/testFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE Tests`;
  prisma.$disconnect;
});

describe("POST /test", () => {
  it("Create new test", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);

    const login = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });

    const token = await login.body.token;
    const test = await testFactory.createTestFactory();
    const result = await supertest(server)
      .post(`/test`)
      .set("Authorization", "Bearer " + token)
      .send(test);

    expect(result.status).toBe(201);
  });
});
