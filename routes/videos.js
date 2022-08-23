import express from 'express'

import { addVidoe,updateVidoe, getVidoe, deleteVidoe } from "../controllers/videos.js";
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router()

router.post('/createVideo', verifyToken, addVidoe)

router.put('/updateVideo/:videoId', verifyToken, updateVidoe)

router.get('/findVideo/:videoId', verifyToken, getVidoe)

router.delete('/deleteVideo/:videoId', verifyToken, deleteVidoe)

router.get('/watchVideo/:videoId', verifyToken, deleteVidoe)

router.get('/trendsVideo/:viedoId', verifyToken, deleteVidoe)

router.get('/randomVideos', verifyToken, deleteVidoe)

router.get('/subdcribedChannelsVideos', verifyToken, deleteVidoe)



export default router