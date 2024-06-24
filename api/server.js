import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";

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

app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        }
    );
});