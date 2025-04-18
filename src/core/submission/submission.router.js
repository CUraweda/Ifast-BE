import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import SubmissionController from "./submission.controller.js";
import SubmissionValidator from "./submission.validator.js";
import { baseValidator } from "../../base/validator.base.js";
import auth from "../../middlewares/auth.middleware.js";

const r = Router(),
  validator = SubmissionValidator,
  controller = new SubmissionController();

r.get(
  "/show-all",
  auth(['ADMIN']),
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get("/show-one/:id", auth(), controller.findById);

r.post(
  "/create",
  auth(['ADMIN']),
  validatorMiddleware({ body: validator.create }),
  controller.create
  );
  
  r.put(
    "/update/:id",
    auth(),
    validatorMiddleware({ body: validator.update }),
    controller.update
    );
    
r.delete("/delete/:id", auth(['ADMIN']), controller.delete);

const submissionRouter = r;
export default submissionRouter;
