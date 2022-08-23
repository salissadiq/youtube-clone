import mongoose from 'mongoose'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const videoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    imgUrl: {
        type: String
    },
    VideoUrl:{
        type: Number,
        default: 0,
    },
    views:{
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    disLikes: {
        type: [String],
        default: []
    }
},{timestamps: true})

const Video = mongoose.model('Video', videoSchema)
// function validateVideo(video) {
//     const schema = Joi.object({
//         userId: Joi.objectId().required(),
//         title: Joi.string().required().min(5).max(250),
//         description: Joi.string().required().min(5)
//     })
// }

export default Video