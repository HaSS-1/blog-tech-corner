import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2024/01/17/17/54/owl-8515205_1280.png"
    }
}, {
    timestamps:true
}
)

const User = mongoose.model('User', userSchema)


export default User