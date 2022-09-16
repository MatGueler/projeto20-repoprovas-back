import supertest from "supertest";
import prisma from "../src/Database/prisma";
import server from "../src/index";
import {
  errorPasswordFactory,
  loginFactory,
} from "./factories/loginFactory/loginFactory";
import registerFactory, {
  differentPasswordsFactory,
  notEmail,
  smallPassword,
} from "./factories/registerFactory/registerFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  prisma.$disconnect;
});

describe("user test", () => {
  it("user register", async () => {
    const body = await registerFactory();
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(201);
  });

  it(" Try user register with already existent user", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);
    await supertest(server).post(`/signup`).send(body);
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(401);
  });

  it(" Try user register with different passwords", async () => {
    const body = await differentPasswordsFactory();
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(409);
  });

  it(" Try user register with less than 6 characters", async () => {
    const body = await smallPassword();
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(422);
  });

  it(" Try user register is not a email", async () => {
    const body = await notEmail();
    const result = await supertest(server).post(`/signup`).send(body);

    expect(result.status).toBe(422);
  });
});

describe("user test", () => {
  it("Try user login", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);
    const result = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });
    expect(result.status).toBe(200);
  });

  it("Try login with non-existent user", async () => {
    const body = await loginFactory();
    const result = await supertest(server).post(`/signin`).send(body);
    expect(result.status).toBe(401);
  });

  it("Try login with wrong password", async () => {
    const body = await errorPasswordFactory();
    const result = await supertest(server).post(`/signin`).send(body);
    expect(result.status).toBe(401);
  });

  it(" Try user register with less than 6 characters", async () => {
    const body = await smallPassword();
    const result = await supertest(server).post(`/signin`).send(body);

    expect(result.status).toBe(422);
  });

  it(" Try user register is not a email", async () => {
    const body = await notEmail();
    const result = await supertest(server).post(`/signin`).send(body);

    expect(result.status).toBe(422);
  });
});
