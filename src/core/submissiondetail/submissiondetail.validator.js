import Joi from "joi";

export const SubmissionDetailValidator = {
  create: Joi.object({
    submissionId: Joi.string().required().messages({
      "any.required": "Submission ID wajib diisi",
    }),
    name: Joi.string().required().messages({
      "any.required": "Nama detail submission wajib diisi",
    }),
    qty: Joi.number().integer().min(1).required().messages({
      "any.required": "Kuantitas wajib diisi",
      "number.base": "Kuantitas harus berupa angka",
      "number.min": "Kuantitas minimal 1",
    }),
    categoryId: Joi.string().required().messages({
      "any.required": "Category ID wajib diisi",
    }),
    amount: Joi.number().required().messages({
      "any.required": "Amount wajib diisi",
      "number.base": "Amount harus berupa angka",
    }),
    evidence: Joi.string().optional(),
  }),

  update: Joi.object({
    submissionId: Joi.string().optional(),
    name: Joi.string().optional(),
    qty: Joi.number().integer().min(1).optional(),
    categoryId: Joi.string().optional(),
    amount: Joi.number().optional(),
    evidence: Joi.string().optional(),
  }),
};

export default SubmissionDetailValidator;
