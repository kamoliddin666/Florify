import SoldProduct from '../models/sold-product.model.js'
import { handleError } from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { isValidObjectId } from 'mongoose'
import Client from '../models/client.mode.js'
import Product from '../models/product.model.js'
import {createSoldProduct, updateSoldProduct} from '../validation/sold-product.js'





export class SoldProductController {
       async createSoldProduct(req,res){
        try {
            const {value,error}= createSoldProduct(req.body)
            if(error){
                return handleError(res,error,404)
            }
            const {product_id,client_id,quantity}=value
            const product= await Product.findById(product_id)
            if(!product){
                return handleError(res,'Product not found',404)
            }
            const client = await Client.findById(client_id)
            if(!client){
                return handleError(res,'Client not found',404)
            }
            const total_price=quantity*product.price

            const soldProduct = await SoldProduct.create({
                product_id,
                client_id,
                quantity,
                total_price
            })
            return successRes(res,soldProduct,201)
        } catch (error) {
            return handleError(res,error)
        }
    }

    async getAllSoldProduct (req, res){
        try{
            const soldProducts = await SoldProduct.find()
            return successRes(res, soldProducts)
        }catch(error){
            return handleError(res, error)
        }
    }

    async getSoldProductByID(req, res){
        try{
            const id = req.params.id;
            const soldProduct = await SoldProduct.findById(id)
            return successRes(res, soldProduct)
        }catch(error){
            return handleError(res, error)
        }
    }
    async updateSoldProduct(req, res) {
        try {
            const id = req.params.id;
    
            const existingSoldProduct = await SoldProduct.findById(id);
            if (!existingSoldProduct) {
                return handleError(res, 'SoldProduct not found', 404);
            }
    
            const { value, error } = updateSoldProduct(req.body); 
            if (error) {
                return handleError(res, error, 422);
            }
            const updatedSoldProduct = await SoldProduct.findByIdAndUpdate(id, value, { new: true });
            return successRes(res, {
                message: 'SoldProduct updated successfully',
                data: updatedSoldProduct
            });
    
        } catch (error) {
            return handleError(res, error);
        }
    }
    
        async deleteSoldProduct (req,res){
            try{
                const id = req.params.id;
                await SoldProductController.findSoldProductById(res,id)
                await SoldProduct.findByIdAndDelete(id)
                return successRes(res, {message: 'SoldProduct deleted successfuly'})
            }catch(error){
                return handleError(res, error)
            }
        }
    
        static async findSoldProductById(res,id){
            try{
                if(!isValidObjectId(id)){
                    return handleError(res, 'Invalid object ID', 400)
                }
                const soldProduct = await SoldProduct.findById(id)
                if(!soldProduct){
                    return handleError(res, 'Product not found', 404)
                }
                return soldProduct
            }catch(error){
                return handleError(res, error)
            }
        }
}