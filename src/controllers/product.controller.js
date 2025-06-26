import Product from '../models/product.model.js'
import { handleError } from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { createProductValidator, updateProductValidator} from '../validation/product.validation.js'
import { isValidObjectId } from 'mongoose'




export class ProductController {
    async createProduct (req, res){
        try{
            const { value, error } = createProductValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const product = await Product.create(value)
            return successRes(res, product, 201)
        }catch(error){
            return handleError(res, error)
        }
    }
    async getAllProduct (req, res){
        try{
            const products = await Product.find()
            return successRes(res, products)
        }catch(error){
            return handleError(res, error)
        }
    }

    async getProductByID(req, res){
        try{
            const id = req.params.id;
            const product = await Product.findById(id)
            return successRes(res, product)
        }catch(error){
            return handleError(res, error)
        }
    }
async updateProduct(req, res) {
    try {
        const id = req.params.id;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return handleError(res, 'Product not found', 404);
        }

        const { value, error } = updateProductValidator(req.body); 
        if (error) {
            return handleError(res, error, 422);
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, value, { new: true });
        return successRes(res, {
            message: 'Product updated successfully',
            data: updatedProduct
        });

    } catch (error) {
        return handleError(res, error);
    }
}

    async deleteProduct (req,res){
        try{
            const id = req.params.id;
            await ProductController.findProductById(res,id)
            await Product.findByIdAndDelete(id)
            return successRes(res, {message: 'Product deleted successfuly'})
        }catch(error){
            return handleError(res, error)
        }
    }

    static async findProductById(res,id){
        try{
            if(!isValidObjectId(id)){
                return handleError(res, 'Invalid object ID', 400)
            }
            const product = await Product.findById(id)
            if(!product){
                return handleError(res, 'Product not found', 404)
            }
            return product
        }catch(error){
            return handleError(res, error)
        }
    }
}