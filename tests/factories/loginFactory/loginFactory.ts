export async function loginFactory() {
  const body = {
    email: "matt@gmail.com",
    password: "123456",
  };
  return body;
}

export async function errorLoginFactory() {
  const body = {
    email: "linc@gmail.com",
    password: "123456",
  };
  return body;
}

export async function errorPasswordFactory() {
  const body = {
    email: "matt@gmail.com",
    password: "456123",
  };
  return body;
}
