import Joi from "joi";

export const permissionValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().optional(),
  }),
  update: Joi.object({
    name: Joi.string().optional(),
    code: Joi.string().optional(),
    description: Joi.string().optional(),
  }),
};

export default permissionValidator;
