
import { Schema, model, Types } from "mongoose";


const ProductSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true},
    color: { type: String, required: true},
    category_id: { type: Types.ObjectId, ref: 'Category', required: true},
    salesman_id: { type: Types.ObjectId, ref: 'Salesman', required: true}
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});
ProductSchema.virtual('soldproduct', {
    ref: 'SoldProduct',
    localField: '_id',
    foreignField: 'product_id'
})

const Product = model('Product', ProductSchema)
export default Product;