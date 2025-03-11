import Joi from "joi";

export const BankAccountValidator = {
  create: Joi.object({
    idUser: Joi.string().required().messages({
      "string.empty": "ID User harus diisi",
      "any.required": "ID User wajib diisi",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Nama akun harus diisi",
      "any.required": "Nama akun wajib diisi",
    }),
    bankName: Joi.string().required().messages({
      "string.empty": "Nama bank harus diisi",
      "any.required": "Nama bank wajib diisi",
    }),
    number: Joi.string().required().messages({
      "string.empty": "Nomor rekening harus diisi",
      "any.required": "Nomor rekening wajib diisi",
    }),
  }),

  update: Joi.object({
    // Semua field update bersifat opsional
    idUser: Joi.string().optional(),
    name: Joi.string().optional(),
    bankName: Joi.string().optional(),
    number: Joi.string().optional(),
  }),
};

export default BankAccountValidator;
