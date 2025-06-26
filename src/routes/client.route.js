import express from "express";
import { ClientController } from "../controllers/client.controller.js"
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";

const router = express.Router()
const controller = new ClientController()

router
    .post('/sign-up', controller.signUp)
    .post('/sign-in', controller.signIn)
    .post('/confirm-signIn', controller.confirmSignIn)
    .post('/token', controller.newAccessToken)
    .post('/logaut',AuthGuard, controller.logOut)
    .get('/', AuthGuard,RolesGuard(['superadmin', 'admin']),controller.getAllClient)
    .get('/:id',AuthGuard, RolesGuard(['superadmin', 'admin']),controller.getClientById)
    .patch('/:id',AuthGuard,RolesGuard(['superadmin', 'admin']) ,controller.updateClient)
    .delete('/:id',AuthGuard, RolesGuard(['superadmin', 'admin']),controller.deleteClient)
  

export default router;
    