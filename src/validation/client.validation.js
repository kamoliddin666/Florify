import Joi from "joi"

export const  signUpClientValidator = (data) =>{
    const client = Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required()
    })
    return client.validate(data)
}

export const signInClientValidator = (data) => {
    const client = Joi.object({
         phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).optional(),
         hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required(),
         email: Joi.string().email().required()
    })
    return client.validate(data)

}
export const confirmSignInClientValidator = (data) =>{
    const client = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required()
    })
    return client.validate(data)
}

export const  updateClientValidator = (data) =>{
    const client = Joi.object({
        name: Joi.string().optional(),
        phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).optional(),
        address: Joi.string().optional(),
        email: Joi.string().email().optional(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).optional()
    })
    return client.validate(data)
}

export const  createClientValidator = (data) =>{
    const client = Joi.required({
        name: Joi.string().required(),
        phone_number: Joi.string().regex(/^\+998[0-9]{9}$/).required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required()
    })
    return client.validate(data)
}