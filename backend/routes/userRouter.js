const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
// const {validationResult,check,oneOf} = require('express-validator') //TO DO
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SEC_KEY = 'saiisagoodboy'

userRouter
    .get('/all', async (req, res) => {
        try {
            const user = await User.find()
            res.send({ user })
        } catch (error) {
            console.log('error in index.js get request on /user');
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.send({ user })
        } catch (error) {
            console.log('error in index.js get request on /user');
        }
    })
    .post('/signup', async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body
            const usersArray = await User.find()
            const isUser = usersArray.find((u) => u.email === email)
            console.log(isUser);
            if (isUser) {
                res.send('user is already exists.')
                return; //{Cannot set headers after they are sent to the client}
            }
            const authToken = jwt.sign(email, SEC_KEY)
            const hashedPassword = bcrypt.hashSync(password, 10)
            // const errors = validationResult(req)  //TO DO
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            res.send({ authToken })

        } catch (error) {
            console.log('error in index.js post request on /user', error);
        }
    })
    .post('/login', async (req, res) => {
        try {
            //if auth token validated, login using token
            let authTokenFromHeader;
            for (const key in req.headers) {
                if(key === 'auth-token'){
                    authTokenFromHeader = req.headers[key]
                }
            }
            console.log({authTokenFromHeader});
            try {
                if(authTokenFromHeader){
                    const decodedEmail = jwt.verify(authTokenFromHeader,SEC_KEY)
                    const user = await User.find({email:decodedEmail}).select('-password')
                    if(!user){
                        res.send('please login using valid token')
                        return;
                    }
                    res.send(user)
                    return;
                }
            } catch (error) {
                console.log('error while verifying token');
            }

            //login using email & password ,if token is not available

            const { email, password } = req.body
            const user = await User.find({ email })
            if(user.length === 0){
                res.send('please login using correct credentials, looks like user does not exists')
                return;
            }
            const passwordMatched = bcrypt.compareSync(password,user[0].password)
            if(!passwordMatched){
                res.send('please login using correct credentials')
                return;
            }
            const authToken = jwt.sign(email, SEC_KEY)
            console.log(typeof(authToken));
            res.send({ authToken })

        } catch (error) {
            console.log('error in index.js post request on /user', error);
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { returnDocument: 'after', upsert: true })
            res.send({ user })
        } catch (error) {
            console.log('error in index.js put request on /user');
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.send({ user })
        } catch (error) {
            console.log('error in index.js delete request on /user');
        }
    })


module.exports = userRouter