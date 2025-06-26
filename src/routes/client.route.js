import express from "express";
import { ClientController } from "../controllers/client.controller.js"

const router = express.Router()
const controller = new ClientController()

router
    .post('/sign-up', controller.signUp)
    .post('/sign-in', controller.signIn)
    .post('/confirm-signIn', controller.confirmSignIn)
    .post('/token', controller.newAccessToken)
    .post('/logaut', controller.logOut)
  

export default router;
    