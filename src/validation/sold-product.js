import Joi from 'joi'


export const createSoldProduct = (data) =>{
    const soldProduct = Joi.object({
        product_id: Joi.string().required(),
        client_id: Joi.string().required(),
        quantity: Joi.number().required()
        
    })
    return soldProduct.validate(data)
}

export const updateSoldProduct = (data) =>{
    const soldProduct = Joi.object({
        product_id: Joi.string().optional(),
        client_id: Joi.string().optional(),
        quantity: Joi.number().optional()
        
    })
    return soldProduct.validate(data)
}