import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    userName: Joi.string().max(20).min(2).required(),
    firstName: Joi.string().max(20).min(2).required(),
    lastName: Joi.string().max(20).min(2).required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/)
      .required(),
  }),
};

export const signInSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/)
      .required(),
  }),
};

export const verifySchema = {
  params: Joi.object({
    token: Joi.string().required(),
  }),
};


export const PublishNewsSchema = {
  body: Joi.object({
    news: Joi.string().min(2).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const updateUserSchema = {
  body: Joi.object({
    userName: Joi.string().max(20).min(2),
    firstName: Joi.string().max(20).min(2),
    lastName: Joi.string().max(20).min(2),
    password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const deleteUserSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const answerQuestionSchema = {
  body: Joi.object({
    answer: Joi.string().max(100).min(10).required(),
    questionId: Joi.string().hex().length(24).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const searchByNameSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

// export const getAdminNewsSchema = {
//   // params: Joi.object({
//   //   id: Joi.string().hex().length(24).required(),
//   // }),
//   Headers: Joi.object({
//     token: Joi.string().required(),
//   }),
// };

// export const logOutSchema = {
//   params: Joi.object({
//     id: Joi.string().hex().length(24).required(),
//   }),
//   Headers: Joi.object({
//     token: Joi.string().required(),
//   }),
// };

export const getAllAdminSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const getAllTeacherSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const getAllStudentSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const FqAnswersSchema = {
  params: Joi.object({
    questionId: Joi.string().hex().length(24).required(),
  })}