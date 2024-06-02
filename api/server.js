import express from "express";


const app = express()
const PORT = 5173
const HOST = '0.0.0.0' //listen on all network interfaces

app.listen(PORT, HOST, () => {
    console.log(`Server is now running on --> http://${HOST}:${PORT}`)
})