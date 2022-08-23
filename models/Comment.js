import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    videoId: {
        type: mongoose.Types.ObjectId,
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

exports.Comment = Comment