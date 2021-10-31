const mongoose = require('mongoose');

const User = require('./user-model');

const Schema = mongoose.Schema;

const Post = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: User , required: true},
    datePosted: { type: Date}
})

module.exports = mongoose.model('posts', Post);