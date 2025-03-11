import { Router } from 'express';
import validatorMiddleware from '../../middlewares/validator.middleware.js';
import UserController from './user.controller.js';
import UserValidator from './user.validator.js';
import { baseValidator } from '../../base/validator.base.js';
import auth from '../../middlewares/auth.middleware.js';

const r = Router(),
  validator = UserValidator,
  controller = new UserController();

r.get(
  '/show-all',
  auth(['ADMIN']),
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get('/show-one/:id', controller.findById);
r.get('/show-me', auth(), controller.findByUser);

r.post(
  '/create',
  auth(['ADMIN']),
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
r.post(
  '/add-roles/:id',
  auth(['ADMIN']),
  validatorMiddleware({ body: UserValidator.addRoles }),
  controller.addRoles
);
r.delete(
  '/remove-roles/:id',
  auth(['ADMIN']),
  validatorMiddleware({ body: UserValidator.removeRoles }),
  controller.removeRoles
);
r.put(
  '/update-hirarky/:id',
  auth(['ADMIN']),
  validatorMiddleware({ body: UserValidator.assignHirarky }),
  controller.updateHirarky
);
r.delete('/remove-hirarky/:id', auth(['ADMIN']), controller.removeHirarky);

const userRouter = r;
export default userRouter;
