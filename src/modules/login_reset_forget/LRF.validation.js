import Joi from "joi";

export const signInSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/)
      .required(),
  }),
};

export const forgetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/)
      .required(),
    code: Joi.string().required(),
  }),
};
