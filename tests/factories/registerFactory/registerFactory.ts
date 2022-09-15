export default async function registerFactory() {
  const body = {
    email: "matt@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  };
  return body;
}

export async function differentPasswordsFactory() {
  const body = {
    email: "matt@gmail.com",
    password: "123456",
    confirmPassword: "985674",
  };
  return body;
}
export async function smallPassword() {
  const body = {
    email: "matt@gmail.com",
    password: "123",
    confirmPassword: "123",
  };
  return body;
}

export async function notEmail() {
  const body = {
    email: "matt",
    password: "123456",
    confirmPassword: "123456",
  };
  return body;
}
