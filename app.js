const express = require('express')
const { dirname } = require('path')
const app = express()
const path = require('path')




app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(4000, () => console.log('Server has been started on port 4000...'))