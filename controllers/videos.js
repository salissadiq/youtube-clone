import { tryCatchMiddleware } from "../middleware/tryCatch.js"
import Video from "../models/Video.js"

export const addVidoe = tryCatchMiddleware( async(req, res )=> {
    const newVideo = new Video({userId: req.user.id, ...req.body})
    await newVideo.save()
    res.status(200).json(newVideo)
})

export const getVidoe = tryCatchMiddleware( async(req, res )=> {
    const video = await Video.findById(req.params.id)
    if(!video) return res.status(404).send("No video found!")

    res.status(200).json(video)
})

export const updateVidoe = tryCatchMiddleware( async(req, res )=> {
    const video = await Video.findById(req.params.id)
    if(!video) return res.status(404).send("No video found!")

    if(req.user.id !== video.userId) return res.status(403).send("You can only edit your video")
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, 
        {$set:req.body }, {new:true})
    res.status(200).send(updatedVideo)
})

export const deleteVidoe = tryCatchMiddleware( async(req, res )=> {
    const video = await Video.findById(req.params.id)
    if(!video) return res.status(404).send("No video found!")

    if(req.user.id !== video.userId) return res.status(403).send("You can only delete your video")

    const deletedVideo = await Video.findByIdAndDelete(req.params.id)

    res.status(200).send(deletedVideo)
})

export const addView = tryCatchMiddleware( async(req, res)=> {
    await Video.findByIdAndUpdate(req.params.id, {
        $inc: {views: 1}
    })

    res.status(200).send("view has been incremented!")
})

export const trendsVideos = tryCatchMiddleware( async(req, res)=> {
    
})

export const randomVideos = tryCatchMiddleware( async(req, res)=> {
    
})

export const subscribedChannelsVideos = tryCatchMiddleware( async(req, res)=> {
    
})