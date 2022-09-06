import Comment, {validateComment} from "../models/Comment.js"
import Video from "../models/Video.js"
import { tryCatchMiddleware } from "../middleware/tryCatch.js"

export const addComment = tryCatchMiddleware( async(req, res) =>{

    const {error} = validateComment({...req.body, userId: req.user.id})
    if(error) return res.status(401).send(error.details[0].message)

    const newComment = new Comment({...req.body, userId: req.user.id})
    await newComment.save()
    res.status(200).send(newComment)
})

export const deleteComment = tryCatchMiddleware( async(req, res) =>{
    const comment = await Comment.findById(req.params.commentId)
    if(!comment) return res.status(404).send("No comment found")

    const video = await Video.findById(comment.videoId)
    if(!video) return res.status(404).send("No video found for that comment")

    console.log(req.user.id + ' ' + comment.userId + ' ' + video.userId)
    if(req.user.id !== comment.userId || req.user.id !== video.userId) return res.status(403).send("You can only delete your comment")
    await Comment.findByIdAndDelete(req.params.commentId)

    res.status(200).send("The comment has been deleted")
    
})

export const getComment = tryCatchMiddleware( async(req, res) =>{
    const comments = await Comment.find({videoId: req.params.videoId})
    res.status(200).send(comments)
})