import Comment, {validateComment} from "../models/Comment.js"
import { tryCatchMiddleware } from "../middleware/tryCatch.js"

export const addComment = tryCatchMiddleware( async(req, res) =>{

    const {error} = validateComment({...req.body, userId: req.user.id})
    if(error) return res.status(401).send(error.details[0].message)
    
    const newComment = new Comment({...req.body, userId: req.user.id})
    await newComment.save()
    res.status(200).send(newComment)
})

export const deleteComment = tryCatchMiddleware( async(req, res) =>{
    
})

export const getComment = tryCatchMiddleware( async(req, res) =>{
    
})