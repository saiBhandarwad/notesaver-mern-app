const express = require('express')
const connectToMongo = require('./db')
const userRouter = require('./routes/userRouter')
const { urlencoded } = require('body-parser')
const auth = require('./middlewares/auth')
const cors = require('cors')
const notesRouter = require('./routes/notesRouter')
const server = express()
const port = 8080


connectToMongo()

server.use(express.json())
server.use(cors())
// server.use(urlencoded({extended:true}))

server.use('/user', userRouter)
server.use('/notes',auth, notesRouter)

server.listen(port, () => {
    console.log(`notesaver app listning at port : ${port}`);
})
