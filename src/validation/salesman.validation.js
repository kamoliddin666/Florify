import Joi from "joi"

export const signUpSalesmanValidator = (data) =>{
    const salesman = Joi.object({
        username: Joi.string().required(),
        full_name: Joi.string().required(),
        phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required()
    })
    return salesman.validate(data)
}

export const signInSalesmanValidator = (data) =>{
    const salesman = Joi.object({
        email: Joi.string().email().required(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required()
    })
    return salesman.validate(data)
}

export const confirmSignInSalesmanValidator = (data) =>{
    const salesman = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required()
    })
    return salesman.validate(data)
}

export const updateSalesmanValidator = (data) =>{
    const salesman = Joi.object({
        username: Joi.string().optional(),
        full_name: Joi.string().optional(),
        phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).optional(),
        address: Joi.string().optional(),
        email: Joi.string().optional(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).optional()
    })
    return salesman.validate(data)
}