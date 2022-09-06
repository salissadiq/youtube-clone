import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import usersRoutes from './routes/users.js'
import userAuthentication from './routes/auth.js'
import videosRoutes from './routes/videos.js'
import commentsRoutes from './routes/comments.js'
const app = express()

mongoose.connect('mongodb://localhost/youtube-clone')
    .then(()=>console.log('Connected to mongodb'))
    .catch((err)=>console.log(err))

    app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth/', userAuthentication)
app.use('/api/users/', usersRoutes)
app.use('/api/videos/', videosRoutes)
app.use('/api/comments/', commentsRoutes)

// Error handling
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const message = "Something went wrong!"
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message
    })
})

app.listen(5500, ()=>{
    console.log('Server running on port 5500')
})