import Joi from "joi"

export const signUpAdminValidator = (data) =>{
    const admin = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\+998[0-9]{9}$/).required(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).required()
    })
    return admin.validate(data)
}

export const signInAdminValidator = (data) => {
    const admin = Joi.object({
        username: Joi.string().required(),
        hashedPassword: Joi.string().required()
    })
    return admin.validate(data)
}

export const confirmSignInAdminValidator = (data) =>{
    const admin = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required()
    })
    return admin.validate(data)
}

export const updateAdminValidator = (data) =>{
    const admin = Joi.object({
        username: Joi.string().min(4).optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().regex(/^\+998[0-9]{9}$/).optional(),
        hashedPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,20}$/).optional()
    })
    return admin.validate(data)
}


