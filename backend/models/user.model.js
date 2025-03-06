import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    profilePicture : {
        type : String,
        default : ""
    },
    email : { 
        type: String, 
        required: true, 
        unique: true 
    },
    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ]
}, {timestamps : true});

const User = mongoose.model("User", userSchema);

export default User;