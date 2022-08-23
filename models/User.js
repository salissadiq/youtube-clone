import mongoose from 'mongoose'
import Joi from 'joi'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        trim: true
    },
    img: {
        type: String
    },
    subscribers:{
        type: Number,
        default: 0,
    },
    subscribedChannels:{
        type: [String]
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)

export const validatUser = (user)=> {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50).trim(),
        email: Joi.string().email().required().min(5).max(30).trim(),
        password: Joi.string().required().min(6).max(255).trim()
    })

    return schema.validate(user)
}

export const signInUserValidation = (user)=> {
    const schema = Joi.object({
        email: Joi.string().email().required().min(5).max(50).trim(),
        password: Joi.string().required().min(6).max(255).trim()
    })

    return schema.validate(user)
}

export default User