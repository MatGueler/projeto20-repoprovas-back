import { Users } from "@prisma/client";

export type ILoginUser = Omit<Users, "id">;

export type IRegisterUser = Omit<Users, "id">;

export interface IDataUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export type IUser = Users;
