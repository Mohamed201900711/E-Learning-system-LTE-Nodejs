import Joi from "joi";


export const updateUserSchema = {
  body: Joi.object({
    userName: Joi.string().max(20).min(2),
    firstName: Joi.string().max(20).min(2),
    lastName: Joi.string().max(20).min(2),
    password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const addQuestionSchema = {
  body: Joi.object({
    question: Joi.string().required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};
export const updateQuestionSchema = {
  body: Joi.object({
    updatedQuestion: Joi.string().required(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const deleteQuestionSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};
export const getAllQuestionsSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};
export const answerQuestionSchema = {
  body: Joi.object({
    answer: Joi.string().max(100).min(10).required(),
    questionId: Joi.string().hex().length(24).required()
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};

export const ContentAnswersSchema = {
  params: Joi.object({
    questionId: Joi.string().hex().length(24).required(),
  })}