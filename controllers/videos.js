import { tryCatchMiddleware } from "../middleware/tryCatch.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const addVidoe = tryCatchMiddleware( async(req, res )=> {
    const newVideo = new Video({userId: req.user.id, ...req.body})
    await newVideo.save()
    res.status(200).json(newVideo)
})

export const getVidoe = tryCatchMiddleware( async(req, res )=> {
    const video = await Video.findById(req.params.videoId)
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

export const randomVideos = tryCatchMiddleware( async(req, res)=> {
    const randomVideos = await Video.aggregate([{$sample:{size: 1}}])
    res.status(200).send(randomVideos)
})

export const trendsVideos = tryCatchMiddleware( async(req, res)=> {
    const trendsVideos = await Video.find().sort({views: -1})
    res.send(trendsVideos)
})

export const subscribedChannelsVideos = tryCatchMiddleware( async(req, res)=> {
    const user = await User.findById(req.user.id)
    if(!user) return res.status(404).send("No user found with the given ID")

    const subscribedChannels = user.subscribedChannels
    const list = await Promise.all(subscribedChannels.map((channelId) => {
       return Video.find({userId: channelId})
    }))
    res.status(200).send(list.flat().sort((a, b) => b.createdAt - a.createdAt)) 
})

export const getVideoByTags = tryCatchMiddleware( async(req, res)=> {
    const tags = req.query.tags.split(",")

    const videos = await Video.find({tags: {$in: tags}}).limit(40)
    res.status(200).send(videos)
})

export const searchVideo = tryCatchMiddleware( async(req, res)=> {
    const query = req.query.query

    const videos = await Video.find({title: {$regex: query, $options:"i"} })

    if(!videos) return res.status(404).send("No video found!")

    res.status(200).send(videos)
})