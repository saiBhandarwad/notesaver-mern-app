const express = require('express')
const notesRouter = express.Router()
const Note = require('../models/notes')
const auth = require('../middlewares/auth')

notesRouter
    .get('/', async (req, res) => {
        try {
            const note = await Note.find({user:req.userId})
            res.send(note)
        } catch (error) {
            console.log('this error is occured in get req on notes in notesRouter')
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const note = await Note.findById(req.params.id)
            res.send(note)
        } catch (error) {
            console.log('this error is occured in get req on notes in notesRouter')
        }
    })
    .post('/', async (req, res) => {
        try {
            const { title, description } = req.body
            const note = await Note.create({
                title,
                user:req.userId,
                description
            })
            res.send(note)
        } catch (error) {
            console.log('this error is occured in post req on notes in notesRouter')
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const note = await Note.findByIdAndUpdate(req.params.id,{...req.body},{returnDocument:'after'})
            res.send(note)
        } catch (error) {
            console.log('this error is occured in put req on notes in notesRouter')
        }
    })
    .delete('/all', async (req, res) => {
        try {
            const note = await Note.deleteMany({user:req.userId})
            res.send(note)
        } catch (error) {
            console.log('this error is occured in put req on notes in notesRouter')
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const note = await Note.findByIdAndDelete(req.params.id,{returnDocument:'after'})
            res.send(note)
        } catch (error) {
            console.log('this error is occured in put req on notes in notesRouter')
        }
    })

module.exports = notesRouter