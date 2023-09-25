const mongoose = require("mongoose");
const { Schema } = require("mongoose")
const Note = new Schema({
    title:{
        type :String,
        required:true,
    },
    user:{
        type :String,
    },
    description:{
        type :String,
    },
})

module.exports = mongoose.model('note',Note)