
import { handleError } from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { createCategoryValidator, updateCategoryValidator} from '../validation/category.validation.js'
import { isValidObjectId } from 'mongoose'
import Category from '../models/category.model.js'

export class CategoryController{
    async createCategory(req, res){
        try{
            const { value, error } = createCategoryValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const category = await Category.create(value)
            return successRes(res, category)
        }catch(error){
            return handleError(res, error)
        }
    }

    async getAllCategory(req,res){
        try{
            const category = await Category.find()
            return successRes(res, category)
        }catch(error){
            return handleError(res, error)
        }
    }
    async getCategorytById (req, res){
        try{
            const id = req.params.id;
            const category = await Category.findById(id)
            return successRes(res, category)
        }catch(error){
            return handleError(res, error)
        }
    }

    async updateCategory (req, res) {
        try{
            const id = req.params.id;
            const category = await CategoryController.findCategoryById(res, id)
            const { value, error } = updateCategoryValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const updateCategory = await Category.findByIdAndUpdate(id, value,{new:true})
            return successRes(res, updateCategory)
        }catch(error){
            return handleError(res, error)
        }
    }

    async deleteCategory(req, res){
        try{
            const id = req.params.id;
            await CategoryController.findProductById(res, id)
            await Category.findByIdAndDelete(id)
            return successRes(res, {message: 'Category deleted successfuly'})
        }catch(error){
            return handleError(res, error)
        }
    }

    static async findCategoryById(res, id){
        try{
            if(!isValidObjectId(id)){
                return handleError(res, 'Invalid objected ID', 400)
            }
            const category = await Category.findById(id)
            if(!category){
                return handleError(res, 'Category not found ', 404)
            }
            return category
        }catch(error){
            return handleError(res, error)
        }
    }

}