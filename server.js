require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')

const friendRoutes = require('./routes/friend')

const app = express()

app.use(express.json())

// routes
app.use('/api/friends', friendRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`DB connect and Server running on port ${ process.env.PORT }`)
        })
    })
    .catch(error => {
        console.log(error.message)
    })

