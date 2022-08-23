import express  from "express"
import { updateUser, getUser, deleteUser, subscribe, unSubscribe, like, disLike } from "../controllers/users.js"
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router()

router.put('/updateUser/:id', verifyToken, updateUser)

router.get('/findUser/:id', getUser)

router.delete('/deleteUser/:id', deleteUser)

router.post('/subscribe/:channelId', subscribe)

router.put('/unSubscribe/:channelId', unSubscribe)

router.put('/like/:videoId', like)

router.put('/disLike/:videoId', disLike)




export default  router