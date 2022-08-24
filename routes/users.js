import express  from "express"
import { updateUser, getUser, deleteUser, subscribe, unSubscribe, like, disLike } from "../controllers/users.js"
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router()

router.put('/updateUser/:id', verifyToken, updateUser)

router.get('/findUser/:id', verifyToken, getUser)

router.delete('/deleteUser/:id', verifyToken, deleteUser)

router.post('/subscribe/:channelId', verifyToken, subscribe)

router.put('/unSubscribe/:channelId', verifyToken, unSubscribe)

router.put('/like/:videoId', verifyToken, like)

router.put('/disLike/:videoId', verifyToken, disLike)




export default  router