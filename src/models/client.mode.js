

import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
    name: {type: String, required: true},
    phone_number: {type: String, unique: true, required: true},
    address: {type: String, unique: true, required: true},
    hashedPassword: {type: String, required: true},
    email: {type: String, unique: true, required: true }
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

ClientSchema.virtual('sold_product',{
    ref: 'Sold_product',
    localField: '_id',
    foreignField: 'client_id'
})

const Client = model('Client', ClientSchema);
export default Client;