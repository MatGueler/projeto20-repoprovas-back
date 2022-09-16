import { faker } from "@faker-js/faker";

export default async function registerFactory() {
  const email = faker.internet.email();
  const password = faker.lorem.word(6);
  return { email, password, confirmPassword: password };
}

export async function differentPasswordsFactory() {
  const email = faker.internet.email();
  const password = faker.lorem.word(6);
  const confirmPassword = faker.word.verb(6);
  return { email, password, confirmPassword };
}
export async function smallPassword() {
  const email = faker.internet.email();
  const password = faker.lorem.word(2);
  return { email, password, confirmPassword: password };
}

export async function notEmail() {
  const email = faker.lorem.word(6);
  const password = faker.lorem.word(6);
  return { email, password, confirmPassword: password };
}
