import express from "express"
import { addComment, deleteComment, getComment } from "../controllers/comments.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/addComment', verifyToken, addComment)
router.post('/addComment', verifyToken, deleteComment)
router.post('/addComment', verifyToken, getComment)

export default router