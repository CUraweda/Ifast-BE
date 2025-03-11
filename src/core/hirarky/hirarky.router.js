import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import hirarkyController from "./hirarky.controller.js";
import hirarkyValidator from "./hirarky.validator.js";
import { baseValidator } from "../../base/validator.base.js";
import auth from "../../middlewares/auth.middleware.js";

const r = Router();
const controller = new hirarkyController();

r.get(
  "/show-all",
  auth(["ADMIN"]),
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get("/show-one/:id", controller.findById);

r.post(
  "/create",
  auth(["ADMIN"]),
  validatorMiddleware({ body: hirarkyValidator.create }),
  controller.create
);

r.put(
  "/update/:id",
  auth(["ADMIN"]),
  validatorMiddleware({ body: hirarkyValidator.update }),
  controller.update
);

r.delete("/delete/:id", auth(["ADMIN"]), controller.delete);

export default r;