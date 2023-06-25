import Joi from "joi";




export const createQuizSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),

  body: Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),

    questions_list: Joi.array().items(
      Joi.object({
        question_number: Joi.number().required(),
        question: Joi.string().required(),
        options: Joi.object().required()
      })
    ),

    answers: Joi.object().pattern(Joi.number(), Joi.number()).required()
  }),
};


export const getQuizSchema = {

  params: Joi.object({
    quizId: Joi.string().hex().required(),
  }),

  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const updateQuizSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),

  body: Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),

    questions_list: Joi.array().items(
      Joi.object({
        question_number: Joi.number().required(),
        question: Joi.string().required(),
        options: Joi.object().required()
      })
    ),

    answers: Joi.object().pattern(Joi.number(), Joi.number()).required()
  }),
};


export const deleteQuizSchema = {
  params: Joi.object({
    quizId: Joi.string().hex().length(24).required(),
  }),

  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


export const publishQuizSchema = {
  // params: Joi.object({
  //     id: Joi.string().hex().required(),
  //   }),
  //   Headers: Joi.object({
  //     token: Joi.string().required(),
  //   }),
};





export const getAllQuizSchema = {

  

  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};





