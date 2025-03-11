import Joi from "joi";

export const SubmissionValidator = {
  create: Joi.object({
    number: Joi.string().required().messages({
      "any.required": "Nomor submission wajib diisi",
      "string.base": "Nomor submission harus berupa string"
    }),
    projectId: Joi.string().required().messages({
      "any.required": "Project ID wajib diisi",
      "string.base": "Project ID harus berupa string"
    }),
    date: Joi.date().required().messages({
      "any.required": "Tanggal submission wajib diisi",
      "date.base": "Tanggal submission tidak valid"
    }),
    activity: Joi.string().required().messages({
      "any.required": "Aktivitas wajib diisi",
      "string.base": "Aktivitas harus berupa string"
    }),
    description: Joi.string().required().messages({
      "any.required": "Deskripsi wajib diisi",
      "string.base": "Deskripsi harus berupa string"
    }),
    typeId: Joi.string().required().messages({
      "any.required": "Type wajib diisi",
      "string.base": "type harus berupa string"
    }),
    status: Joi.string().optional() // bisa disesuaikan jika ada enum status tertentu, misalnya: PENDING, APPROVED, REJECTED
  }),

  update: Joi.object({
    userId: Joi.string().optional(),
    number: Joi.string().optional(),
    projectId: Joi.string().optional(),
    date: Joi.date().optional(),
    activity: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional()
  })
};

export default SubmissionValidator;
