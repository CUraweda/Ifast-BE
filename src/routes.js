import express from 'express';
const router = express.Router();
import whatsappRouter from "./core/whatsapp/whatsapp.router.js";
import authenticationRouter from './core/authentication/authentication.router.js';
import userRouter from './core/user/user.router.js';
import hirarkyRouter from './core/hirarky/hirarky.router.js';
import hirarkyLevelRouter from './core/hirarkylevel/hirarkylevel.router.js';

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
        path : '/hirarky-level',
        route: hirarkyLevelRouter
    }
]

routeLists.forEach((route) => {
    router.use(route.path, route.route);
  });
  
  export default router;