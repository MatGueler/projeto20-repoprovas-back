import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as repository from "../Repositories/UserRepository";
import { IDataUser, ILoginUser, IUser } from "../Types/UserTypes";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../Utils/errorUtils";

export async function registerUser(infos: IDataUser) {
  const verifyPasswords = await verifyEqualPasswords(
    infos.password,
    infos.confirmPassword
  );
  const cryptPassword = await encryptPassword(infos.password);
  const verify = await verifyEmailAvailability(infos.email);
  const infosRegister = {
    email: infos.email,
    password: String(cryptPassword),
  };
  const Register = await repository.InsertUser(infosRegister);
}

export async function loginUser(infos: ILoginUser) {
  const user = await verifyUserExist(infos.email);
  await verifyPassword(infos.password, user);
  const token = await createToken(user.id);
  await repository.InsertSession(user.id, token);
  return token;
}

// aux functions

async function verifyEmailAvailability(email: string) {
  const verifyUserEmail = await repository.verifyUserEmail(email);
  if (verifyUserEmail) {
    throw unauthorizedError("Account already exist");
  }
  return verifyUserEmail;
}

async function verifyUserExist(email: string) {
  const verifyUserExist = await repository.verifyUserExist(email);
  if (!verifyUserExist) {
    throw unauthorizedError("Account doesn't exist");
  }
  return verifyUserExist;
}

async function findUserById(id: number) {
  const user = await repository.findById(id);
  if (!user) throw notFoundError("User not found");

  return user;
}

async function findSessionByToken(token: string) {
  const session = await repository.findSession(token);
  if (!session) throw notFoundError("Session not found");

  return session;
}

async function createToken(id: number) {
  const JWT_SECRET = String(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      userId: Number(id),
    },
    JWT_SECRET,
    { expiresIn: process.env.TIME_JWT }
  );

  return token;
}

// verify passwords
export async function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

async function verifyEqualPasswords(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    throw conflictError("Passwords are different");
  }
}

async function verifyPassword(password: string, user: IUser) {
  const verifyPassword = bcrypt.compareSync(password, user.password);
  if (!verifyPassword) {
    throw unauthorizedError("Incorrect data");
  }
}

const userService = {
  findUserById,
  loginUser,
  encryptPassword,
  findSessionByToken,
};

export default userService;
