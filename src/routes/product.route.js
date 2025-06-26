import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js" 
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
const router = Router()


const controller = new ProductController()

router
    .post('/',AuthGuard, RolesGuard(['superadmin', 'admin']) ,controller.createProduct)
    .get('/', controller.getAllProduct)
    .get('/:id', controller.getProductByID)
    .patch('/:id',AuthGuard,RolesGuard(['superadmin', 'admin']), controller.updateProduct)
    .delete('/:id',AuthGuard, RolesGuard(['superadmin', 'admin']),controller.deleteProduct)

export default router

    