
import { Schema, model } from "mongoose";

const SalesmanSchema = new Schema({
    username: { type: String, unique: true, required: true},
    full_name: { type: String, required: true},
    phone_number: { type: String, unique: true, required: true},
    address: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    hashedPassword: { type: String, required: true},
},{
    timestamps:true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

SalesmanSchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'salesman_id'
})

const Salesman = model('Salesman', SalesmanSchema)
export default Salesman;