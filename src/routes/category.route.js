import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js" 
import { AuthGuard } from "../guards/auth.guard.js"; 
import { RolesGuard } from "../guards/roles.guard.js";
const router = Router()


const controller = new CategoryController()

router
    .post('/', AuthGuard, RolesGuard(['superadmin']),controller.createCategory)
    .get('/',controller.getAllCategory)
    .get('/:id',controller.getCategorytById)
    .patch('/:id', AuthGuard, RolesGuard(['superadmin']),controller.updateCategory)
    .delete('/:id', AuthGuard, RolesGuard(['superadmin']),controller.deleteCategory)
    
export default router