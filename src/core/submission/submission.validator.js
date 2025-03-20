import Joi from "joi";

export const SubmissionValidator = {
  create: Joi.object({
    projectId: Joi.string().required().messages({
      "any.required": "Project ID is required",
      "string.base": "Project ID must be a string"
    }),
    date: Joi.date().required().messages({
      "any.required": "Submission date is required",
      "date.base": "Submission date is not valid"
    }),
    activity: Joi.string().required().messages({
      "any.required": "Activity is required",
      "string.base": "Activity must be a string"
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.base": "Description must be a string"
    }),
    typeId: Joi.string().required().messages({
      "any.required": "Type is required",
      "string.base": "Type must be a string"
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string"
    }),
    
  }),

  update: Joi.object({
    userId: Joi.string().optional(),
    projectId: Joi.string().optional(),
    date: Joi.date().optional(),
    activity: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional()
  })
};

export default SubmissionValidator;
