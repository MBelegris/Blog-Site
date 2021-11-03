const mongoose = require('mongoose');

mongoose
    .connect('mongodb://mongo:27017/blog-site')
    .catch(e => {
        console.error('My Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;