import express from 'express'

import { addVidoe,updateVidoe, getVidoe, deleteVidoe, addView, trendsVideos, randomVideos, subscribedChannelsVideos } from "../controllers/videos.js";
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router()

router.post('/createVideo', verifyToken, addVidoe)

router.put('/updateVideo/:videoId', verifyToken, updateVidoe)

router.get('/findVideo/:videoId', getVidoe)

router.delete('/deleteVideo/:videoId', verifyToken, deleteVidoe)

router.get('/viewVideo/:videoId', verifyToken, addView)

router.get('/trendsVideo/:viedoId', verifyToken, trendsVideos)

router.get('/randomVideos', verifyToken, randomVideos)

router.get('/subdcribedChannelsVideos', verifyToken, subscribedChannelsVideos)



export default router