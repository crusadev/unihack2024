const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cnp:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
},{timestamps:false})

const User = mongoose.model("User",UserSchema);

module.exports = User;