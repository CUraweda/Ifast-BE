import express from 'express';
const router = express.Router();
import whatsappRouter from "./core/whatsapp/whatsapp.router.js";
import authenticationRouter from './core/authentication/authentication.router.js';
import userRouter from './core/user/user.router.js';
import hirarkyRouter from './core/hirarky/hirarky.router.js';
import submissionRouter from './core/submission/submission.router.js';
import submissionDetailRouter from './core/submissiondetail/submissiondetail.router.js';
import divisionRouter from './core/division/division.router.js';
import rolesRouter from './core/roles/roles.router.js';
import typeRouter from './core/typesubmission/typesubmission.router.js';
import projectRouter from './core/projectcode/projectcode.router.js';
import categorySubmission from './core/categorysubmission/categorysubmission.router.js';
import approverRouter from './core/approval/approval.router.js'

export const routeLists = [
    {
        path : '/wa',
        route: whatsappRouter
    },
    {
        path : '/auth',
        route: authenticationRouter
    },
    {
        path : '/user',
        route: userRouter
    },
    {
        path : '/hirarky',
        route: hirarkyRouter
    },
    {
        path : '/submission',
        route: submissionRouter
    },
    {
        path : '/submission-detail',
        route: submissionDetailRouter
    },
    {
        path : '/category-submission',
        route: categorySubmission
    },
    {
        path : '/division',
        route: divisionRouter
    },
    {
        path : '/roles',
        route: rolesRouter
    },
    {
        path : '/type',
        route: typeRouter
    },
    {
        path : '/project',
        route: projectRouter
    },
    {
        path : '/approval',
        route: approverRouter
    }
]

routeLists.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  export default router;