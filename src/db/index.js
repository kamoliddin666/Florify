
import { connect } from "mongoose";
import config from "../config/index.js"

export const connectDB = async ()=> {
    try{
        await connect(config.MONGO_URI)
        console.log('Database connected succesfuly')
    }catch(error){
        console.log(`Error connecting to database: ${error}`)
    }
}
