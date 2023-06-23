const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Friend', friendSchema)