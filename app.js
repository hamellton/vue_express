const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
let Schema = mongoose.Schema;
// const { dirname } = require('path')
const path = require('path')
const {v4} = require('uuid')
const app = express()

const PORT = 4000
const URL = 'mongodb://localhost/mongodb'

mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true })); // для чтения body post запроса
// app.use(bodyParser.json()); // для чтения body post запроса
app.use(express.json())

// let connectMongoose = async () => {
//     mongoose.connect(URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//         .then(() => console.log('connected with database mongo...'))
//         .catch((e) => console.log(e))
// }

// connectMongoose()

const CONTACTS = [
    {
        id: v4(),
        name: 'Konstantin',
        value: '+380977849249',
        marked: false
    }
]

mongoose.connect('mongodb://localhost/mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true

});
const MyModel = mongoose.model('mongos', new Schema({
    name: String,
    value: String
}));
// Works
MyModel.findOne(function(error, result) {
    if (result !== null) {
        // console.log(result)
        let newContacts = {
            _id: result._id,
            name: result.name,
            value: result.value
        }
        CONTACTS.push(newContacts)
        // console.log(CONTACTS)
    } else {
        if (!error) throw error
        console.log(error + 'throw error')
    }
});

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 0)
})

// POST
app.post('/api/contacts', (req, res) => {
    const mongoSchema = new Schema({
        _id: String,
        name: String,
        value: String
    })
    let Mongo = mongoose.model('Mongo', mongoSchema)

    const newUser = new Mongo({
        _id: v4(),
        name: req.body.name,
        value: req.body.value
    })
    newUser.save()
        .then(() => console.log('save in database'))
        .catch(() => console.log('whats happen and throw error'))
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
// connectMongoose()

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))