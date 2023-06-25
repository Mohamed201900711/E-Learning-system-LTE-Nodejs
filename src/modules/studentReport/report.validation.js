import Joi from "joi";




export const getReportSchema = {
    params: Joi.object({
      reportId: Joi.string().hex().required(),
      }),
      Headers: Joi.object({
        token: Joi.string().required(),
      })
};


export const getUserReportsSchema = {
      Headers: Joi.object({
        token: Joi.string().required(),
      })
};
