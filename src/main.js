import express from 'express'
import config from './config/index.js'
import { connectDB } from './db/index.js'
import salesmanRouter from './routes/salesman.route.js'
import adminRouter from './routes/admin.route.js'
import clientRouter from './routes/client.route.js'
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import soldProduct from './routes/soldProduct.route.js'
import { createSuperAdmin } from  './db/create_superadmin.js'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = Number(config.PORT)

app.use(express.json())
app.use(cookieParser())
await connectDB()
await createSuperAdmin()

app.use('/salesman', salesmanRouter)
app.use('/admin', adminRouter)
app.use('/client', clientRouter)
app.use('/category', categoryRouter )
app.use('/product', productRouter)
app.use('/soldProduct', soldProduct)



app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})