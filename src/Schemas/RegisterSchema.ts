import joi from "joi";

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().min(6).required(),
});

export default registerSchema;
