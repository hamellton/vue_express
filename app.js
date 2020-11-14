const express = require('express')
const bodyParser = require('body-parser')
// const { dirname } = require('path')
const path = require('path')
const {v4} = require('uuid')
const app = express()

app.use(bodyParser.urlencoded({ extended: true })); // для чтения body post запроса
// app.use(bodyParser.json()); // для чтения body post запроса
app.use(express.json())

// app.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const CONTACTS = [
    {
        id: v4(),
        name: 'Konstantin',
        value: '+380977849249',
        marked: false
    }
]

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 0)
})

// POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    // console.log(req.body)
    console.log(req.body)
    CONTACTS.push(contact)
    console.log(CONTACTS)
    res.status(201).json(contact)
  })



app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(4000, () => console.log('Server has been started on port 4000...'))