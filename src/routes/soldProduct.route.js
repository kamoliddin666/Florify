import { Router } from "express";
import { SoldProductController } from "../controllers/soldProduct.controller.js" 
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
const router = Router()


const controller = new SoldProductController()

router
    .post('/',AuthGuard, RolesGuard(['superadmin', 'admin']) ,controller.createSoldProduct)
    .get('/',AuthGuard,RolesGuard(['superadmin', 'admin']) , controller.getAllSoldProduct)
    .get('/:id',AuthGuard,RolesGuard(['superadmin', 'admin']) , controller.getSoldProductByID)
    .patch('/:id',AuthGuard,RolesGuard(['superadmin', 'admin']), controller.updateSoldProduct)
    .delete('/:id',AuthGuard, RolesGuard(['superadmin', 'admin']),controller.deleteSoldProduct)

export default router

    