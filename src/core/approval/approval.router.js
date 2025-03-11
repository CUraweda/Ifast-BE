import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import ApprovalController from "./approval.controller.js";
import ApprovalValidator from "./approval.validator.js";
import auth from "../../middlewares/auth.middleware.js";

const r = Router();
const controller = new ApprovalController();

// Endpoint untuk mengubah status approval
r.put(
  "/:id",
  auth(), // Pastikan user telah login
  validatorMiddleware({ body: ApprovalValidator.update }),
  controller.updateApproval
);

export default r;
