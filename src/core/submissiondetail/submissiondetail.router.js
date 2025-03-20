import { Router } from 'express';
import validatorMiddleware from '../../middlewares/validator.middleware.js';
import SubmissionDetailController from './submissiondetail.controller.js';
import SubmissionDetailValidator from './submissiondetail.validator.js';
import { baseValidator } from '../../base/validator.base.js';
import auth from '../../middlewares/auth.middleware.js';
import uploader from '../../middlewares/multer.middleware.js';

const r = Router(),
  validator = SubmissionDetailValidator,
  controller = new SubmissionDetailController();

r.get(
  '/show-all',
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get('/show-one/:id', controller.findById);

r.post(
  "/create",
  uploader("/evidence", "image").fields([
    { name: 'evidence' }
  ]),
  auth(),
  validatorMiddleware({ body: validator.create }),
  controller.create
);

r.put(
  '/update/:id',
  auth(['ADMIN']),
  validatorMiddleware({ body: validator.update }),
  controller.update
);

r.delete('/delete/:id', auth(['ADMIN']), controller.delete);

const submissiondetailRouter = r;
export default submissiondetailRouter;
