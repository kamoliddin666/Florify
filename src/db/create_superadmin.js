import Admin from '../models/admin.model.js'
import { Crypto } from '../utils/encrypt_decrypt.js'
import config from '../config/index.js'
import { connectDB } from './index.js'


const crypto = new Crypto()

export const createSuperAdmin = async()=>{
    try{
        await connectDB();
        const existsSuperAdmin = await Admin.findOne({role: 'superadmin'});
        if(!existsSuperAdmin){
            const hashedPassword = await crypto.encrypt(config.SUPERADMIN_PASSWORD);
            await Admin.create({
                username: config.SUPERADMIN_USERNAME,
                email: config.SUPERADMIN_EMAIL,
                phone: config.SUPERADMIN_PHONE,
                hashedPassword: hashedPassword,
                role:'superadmin'
            });
            console.log('SuperAdmin created succesfuly')
        }
    }catch(error){
        console.log(`Error on creating superadmin: ${error}`)
    }
    
}

await createSuperAdmin();