import Joi from 'joi'
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    videoId: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
},{timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

export const validateComment = (comment) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        videoId: Joi.string().required(),
        description: Joi.string().required()
    })

    return schema.validate(comment)
}

export default Comment