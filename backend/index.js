const express = require('express')
const connectToMongo = require('./db')
const userRouter = require('./routes/userRouter')
const { urlencoded } = require('body-parser')
const auth = require('./middlewares/auth')
const cors = require('cors')
const path = require('path')
const notesRouter = require('./routes/notesRouter')
const server = express()
const port = 8080


connectToMongo()

server.use(express.json())
server.use(cors())
server.use(express.static('dist'))

// server.use(urlencoded({extended:true}))

server.use('/user', userRouter)
server.use('/notes',auth, notesRouter)

server.get('/*', (req,res)=>{
    const filePath = path.resolve(__dirname,'./dist/index.html')
    console.log(filePath);
    res.sendFile(filePath)
})

server.listen(port, () => {
    console.log(`notesaver app listning at port : ${port}`);
})
