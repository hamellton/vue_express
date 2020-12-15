const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
let Schema = mongoose.Schema;
const path = require('path')
const {v4} = require('uuid')
const app = express()
require('./mongoDB/config')
const mongos = require('./mongoDB/schems')

const PORT = process.env.PORT || 4000

mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true })); // для чтения body post запроса
app.use(express.json())

const CONTACTS = [
    {
        id: v4(),
        name: 'Konstantin',
        value: '+380977849249',
        marked: false
    }
]

// GET
app.get('/api/contacts', async (req, res) => {
        const post = await mongos.find()
        res.send(post)
        res.status(200).json(post)
})

app.get('/posts', async (req, res) => {
    const post = await mongos.find()
    res.send(post)
})

// POST
app.post('/api/contacts', (req, res) => {
    const newUser = new mongos({
        _id: v4(),
        name: req.body.name,
        value: req.body.value,
        marked: false
    })
    newUser.save()
        .then(() => console.log('save in database'))
        .catch(() => console.log('whats happen and throw error'))
    const contact = {...req.body, id: v4(), marked: false}
    // CONTACTS.push(contact)
    res.status(201).json(contact)
  })



app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))