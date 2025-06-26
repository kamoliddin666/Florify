import express from "express";
import { SalesmanController } from "../controllers/salesman.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";

const router = express.Router()
const controller = new SalesmanController()

router
    .post('/sign-up', AuthGuard, RolesGuard('superadmin'),controller.signUp)
    .post('/sign-in',AuthGuard, controller.signIn)
    .post('/confirm-signin', AuthGuard, controller.confirmSignIn)
    .post('/token', controller.newAccessToken)
    .post('/logout',AuthGuard,RolesGuard('superadmin'), controller.logOut)

export default router;
    