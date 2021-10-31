const mongoose = require('mongoose');

const Post = require('./post-model');

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true},
    dob: { type: Date, required: false},
    phone: {type: String, required: false},
    username: { type: String, required: true},
    password: { type: String, required: true},
    posts: {type: [Post], required: false}
})

module.exports = mongoose.model('users', User);