import Joi from "joi";

export const startExamSchema = {
    params: Joi.object({
        quizId: Joi.string().hex().required(),
      }),
      Headers: Joi.object({
        token: Joi.string().required(),
      }),
};

export const submitExamSchema = {
  body: Joi.object({
    attempted_question: Joi.object().pattern(Joi.number(), Joi.number()).required(),
  }),

  params: Joi.object({
    quizId: Joi.string().hex().length(24).required(),
  }),

  Headers: Joi.object({
    token: Joi.string().required(),
  }),
};


  
