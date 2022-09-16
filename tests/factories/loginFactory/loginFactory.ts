import { faker } from "@faker-js/faker";

export async function loginFactory() {
  const email = faker.internet.email();
  const password = faker.lorem.word(6);
  return { email, password };
}

export async function errorPasswordFactory() {
  const body = {
    email: "matt@gmail.com",
    password: "456123",
  };
  return body;
}
