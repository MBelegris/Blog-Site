const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        dob: { type: String, required: false },
        phone: { type: String, required: false },
        username: { type: String, required: true },
        password: { type: String, required: true }
    }
)

module.exports = mongoose.model('users', User)