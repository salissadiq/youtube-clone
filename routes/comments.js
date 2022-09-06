import express from "express"
import { addComment, deleteComment, getComment } from "../controllers/comments.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/addComment', verifyToken, addComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
router.get('/getComments/:videoId', verifyToken, getComment)

export default router