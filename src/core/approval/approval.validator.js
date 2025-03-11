import Joi from "joi";

export const ApprovalValidator = {
  update: Joi.object({
    status: Joi.string().valid("APPROVED", "REJECTED").required().messages({
      "any.only": "Status harus APPROVED atau REJECTED",
      "any.required": "Status approval wajib diisi",
    }),
    comment: Joi.string().optional(),
  }),
};

export default ApprovalValidator;
