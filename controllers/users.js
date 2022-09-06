import {tryCatchMiddleware} from "../middleware/tryCatch.js"
import User from "../models/User.js"
import Video from "../models/Video.js"
export const updateUser = tryCatchMiddleware( async(req, res) =>{
    if(req.params.id !== req.user.id) return res.status(403).send("You can only update your account!")

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
    const {password, ...others} = updatedUser._doc
    res.status(200).send(others)

})

export const getUser = tryCatchMiddleware( async(req, res) =>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("No user found with the given ID!")
    const {password, ...others} = user._doc
    res.status(200).send(others)

})

export const deleteUser = tryCatchMiddleware( async(req, res) =>{
   if(req.params.id !== req.user.id) return res.status(403).send({message: "You can only delete your account!"})
   const deletedUser = await User.findByIdAndDelete(req.params.id, {new: true})
   const {password, ...others} = user._doc
})

export const subscribe = tryCatchMiddleware( async(req, res) =>{
     await User.findByIdAndUpdate(req.user.id, {
        $push :{subscribedChannels: req.params.channelId}
    })
    await User.findByIdAndUpdate(req.params.channelId, {
        $inc: {subscribers: 1}
    })
    res.status(200).send("Subscription succesfully")

})

export const unSubscribe = tryCatchMiddleware( async(req, res) =>{
    await User.findById(req.user.id, {
        $pull :{subscribedChannels: req.params.channelId}
    })
    await User.findByIdAndUpdate(req.params.channelId, {
        $inc: {subscribers: -1}
    })
    res.status(200).send("Subscription succesfully")
})

export const like = tryCatchMiddleware( async(req, res) =>{
    const userId = req.user.id
    const videoId= req.params.videoId
    await Video.findByIdAndUpdate(videoId, {
        $addToSet:{likes: userId},
        $pull:{disLikes: userId}
    })

    res.status(200).send("The video has been liked!")
})

export const disLike = tryCatchMiddleware( async(req, res) =>{
    const userId = req.user.id
    const videoId= req.params.videoId
    await Video.findByIdAndUpdate(videoId, {
        $addToSet:{disLikes: userId},
        $pull:{likes: userId}
    })

    res.status(200).send("The video has been disliked!")
})