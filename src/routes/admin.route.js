import express from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";

const router = express.Router()
const controller = new AdminController()

router
    .post('/sign-up',RolesGuard(['superadmin']), controller.signUp)
    .post('/sign-in', controller.signIn)
    .post('/token', controller.newAccessToken)
    .post('/logout', AuthGuard, controller.logOut)
    .get('/getAllAdmin', AuthGuard, RolesGuard('superadmin'), controller.getAllAdmins)
    .get('/getAdminById/:id', AuthGuard, controller.getAdminById)
    .patch('/updateAdminById/:id', AuthGuard, controller.updateAdminById)
    .delete('/deleteAdminById/:id', AuthGuard, controller.deleteAdminById)

export default router;
    