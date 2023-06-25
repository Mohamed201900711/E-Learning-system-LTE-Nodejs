import Joi from "joi";

export const addPdfSchema = {
  Headers: Joi.object({
    token: Joi.string().required(),
  }),
  FormData: Joi.object({
    title: Joi.string().required(),
  }),
};
export const deletePdfSchema = {
  params: Joi.object({
    _id: Joi.string().hex().length(24).required(),
  }),
};
