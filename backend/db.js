const mongoose = require('mongoose')
const connectToMongo = () =>{
    try {
        mongoose.connect('mongodb+srv://saiprasad:Gr16Wh48OLJi7vWN@cluster0.temgdst.mongodb.net/notesaver?retryWrites=true&w=majority').then(()=>{
        console.log('connection successful');
    })
    } catch (error) {
        console.log('error in db.js line no 8');
    }
}
module.exports = connectToMongo