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
import testFactory from "./factories/testFactory/testFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`TRUNCATE TABLE Tests`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`TRUNCATE TABLE Tests`;
  prisma.$disconnect();
});

describe("POST /signup", () => {
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

describe("POST /signin", () => {
  it("Try user login", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);
    const result = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
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

describe("POST /test", () => {
  it("Create new test", async () => {
    const body = await registerFactory();
    const register = await supertest(server).post(`/signup`).send(body);

    const login = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });

    const token = await login.body.token;
    const test = await testFactory.createTestFactory();
    const result = await supertest(server)
      .post(`/test`)
      .set("Authorization", "Bearer " + token)
      .send({ ...test, category: "ss" });

    expect(result.status).toBe(422);
  });

  it("Create new test", async () => {
    const body = await registerFactory();
    const register = await supertest(server).post(`/signup`).send(body);

    const login = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });

    const test = await testFactory.createTestFactory();
    const result = await supertest(server).post(`/test`).send(test);

    expect(result.status).toBe(401);
  });

  it("Create new test", async () => {
    const body = await registerFactory();
    const register = await supertest(server).post(`/signup`).send(body);

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

describe("GET /test/disciplines", () => {
  it("Get all tests by discipline", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);

    const login = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });

    const token = await login.body.token;
    const test = await testFactory.createTestFactory();
    await supertest(server)
      .post(`/test`)
      .set("Authorization", "Bearer " + token)
      .send(test);

    const result = await supertest(server)
      .get(`/test/disciplines`)
      .set("Authorization", "Bearer " + token)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("GET /test/teachers", () => {
  it("Get all tests by teachers", async () => {
    const body = await registerFactory();
    await supertest(server).post(`/signup`).send(body);

    const login = await supertest(server)
      .post(`/signin`)
      .send({ email: body.email, password: body.password });

    const token = await login.body.token;
    const test = await testFactory.createTestFactory();
    await supertest(server)
      .post(`/test`)
      .set("Authorization", "Bearer " + token)
      .send(test);

    const result = await supertest(server)
      .get(`/test/teachers`)
      .set("Authorization", "Bearer " + token)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
