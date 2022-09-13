import { Tests } from "@prisma/client";

export type ITests = Tests;

export type ICreateTest = Omit<ITests, "id">;
export interface IDataTest {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

// export type ICardInfo = Omit<ICrads, "id" | "userId">;
