import express, { response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(
    process.env.MONGO
).then(
    () => {console.log('DB connected ')}
).catch(error => {
    console.log(error)
})

const app = express()

const PORT = 3000
const HOST = '0.0.0.0' //listen on all network interfaces

app.use(express.json())

app.listen(PORT, HOST, () => {
    console.log(`Server is now running on --> http://${HOST}:${PORT}`)
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)