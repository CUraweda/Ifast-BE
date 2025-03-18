import Joi from 'joi';

export const projectCodeValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
  }),
  update: Joi.object({
    // no-data
  }),
};

export default projectCodeValidator;
