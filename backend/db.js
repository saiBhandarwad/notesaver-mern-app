const mongoose = require('mongoose')
const connectToMongo = (url) =>{
    try {
        mongoose.connect(url).then(()=>{
        console.log('connection successful');
    })
    } catch (error) {
        console.log('error in db.js line no 8');
    }
}
module.exports = connectToMongo