import joi from "joi";
import { IDataTest } from "../Types/TestsTypes";

const TestSchema = joi.object<IDataTest>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  category: joi.string().required(),
  discipline: joi.string().required(),
  teacher: joi.string().required(),
});

export default TestSchema;
