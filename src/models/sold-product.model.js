
import { Schema, model, Types } from "mongoose";

const SoldProductSchema = new Schema({
    product_id: { type: Types.ObjectId, ref: 'Product', unique: true, required: true},
    client_id: { type: Types.ObjectId, ref: 'Client', unique: true, required: true},
    quantity: { type: Number, required: true},
    total_price: { type: Number, required: true}
},{
    timestamps: true,
});

const SoldProduct = model('SoldProduct', SoldProductSchema);

export default SoldProduct;