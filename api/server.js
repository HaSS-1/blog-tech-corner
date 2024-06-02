import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(
    process.env.MONGO
).then(
    () => {console.log('DB connected ')}
).catch(error => {
    console.log(error)
})

const app = express()
const PORT = 5173
const HOST = '0.0.0.0' //listen on all network interfaces

app.listen(PORT, HOST, () => {
    console.log(`Server is now running on --> http://${HOST}:${PORT}`)
})

