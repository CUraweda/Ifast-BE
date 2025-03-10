import Joi from "joi";

export const UserValidator = {
  create: Joi.object({
    // no-data
  }),
  update: Joi.object({
    // no-data
  }),
  addRoles: Joi.object({
    roles: Joi.array().items(Joi.string()).min(1).required(),
  }),
  removeRoles: Joi.object({
    roles: Joi.array().items(Joi.string()).min(1).required(),
  }),
  updateRoles: Joi.object({
    roles: Joi.array().items(Joi.string()).min(1).required(),
  }),
  assignHirarky: Joi.object({
    hirarkyId: Joi.string().required(),
  }),
};

export default UserValidator;
