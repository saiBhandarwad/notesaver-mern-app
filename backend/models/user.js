const mongoose = require("mongoose");
const { Schema } = require("mongoose")
const User = new Schema({
    firstName:{
        type :String,
        required:true
    },
    lastName:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true,
        unique:true,
    },
    password:{
        type :String,
        required:true,
    },
},{strict: true})

module.exports = mongoose.model('user',User)