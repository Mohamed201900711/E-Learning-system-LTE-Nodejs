import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    userName: Joi.string().max(20).min(2).required(),
    firstName: Joi.string().max(20).min(2).required(),
    lastName: Joi.string().max(20).min(2).required(),
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


export const AskFrequentQuestionschema = {
  
  body: Joi.object({
    questionType: Joi.string().required(),
    question: Joi.string().min(10).required(),
  }),

  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const feedbackSchema = {
  body: Joi.object({
    feedback: Joi.string().required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const AskContentQuestionschema = {
  body: Joi.object({
    questionType: Joi.string().required(),
    question: Joi.string().min(10).required(),
  }),
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const getStudentFeedbackSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const getStudentFrequentQuesSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const getStudentContentQuesSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};
