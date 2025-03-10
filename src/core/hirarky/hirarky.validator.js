import Joi from "joi";

export const hirarkyValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    levels: Joi.array()
      .items(
        Joi.object({
          sequence: Joi.number().required(),
          requiredRole: Joi.string().required(),
          approverId: Joi.string().optional(),
        })
      )
      .min(1)
      .required(),
  }),
  update: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    levels: Joi.array().items(
      Joi.object({
        sequence: Joi.number().required(),
        requiredRole: Joi.string().required(),
        approverId: Joi.string().optional(),
      })
    ).optional(),
  }),
};

export default hirarkyValidator;
