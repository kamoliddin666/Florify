
import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
CategorySchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category_id'
})

const Category = model('Category', CategorySchema)
export default Category;