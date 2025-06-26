
import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    username: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true},
    phone: { type: String, unique: true, required: true},
    hashedPassword: { type: String, unique: true, required: true},
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin'}
},{timestamps:true})

const Admin = model('Admin', AdminSchema)
export default Admin;