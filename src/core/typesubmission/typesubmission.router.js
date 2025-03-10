import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import typeSubmissionController from "./typesubmission.controller.js";
import typeSubmissionValidator from "./typesubmission.validator.js";
import { baseValidator } from "../../base/validator.base.js";
import auth from "../../middlewares/auth.middleware.js";

const r = Router(),
  validator = typeSubmissionValidator,
  controller = new typeSubmissionController();

r.get(
  "/show-all",
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get("/show-one/:id", controller.findById);

r.post(
  "/create",
  auth(['ADMIN']),
  validatorMiddleware({ body: validator.create }),
  controller.create
  );
  
  r.put(
    "/update/:id",
    auth(['ADMIN']),
    validatorMiddleware({ body: validator.update }),
    controller.update
    );
    
r.delete("/delete/:id", auth(['ADMIN']), controller.delete);

const typesubmissionRouter = r;
export default typesubmissionRouter;
