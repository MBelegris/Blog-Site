const mongoose = require('mongoose');
const logger = require('../Logger');

logger.info("Connecting to database");

mongoose
    .connect('mongodb://mongo:27017/blog-site')
    .catch(e => {
        logger.error(`Failed to connect to database ${e.message}`);
        console.error('My Connection error', e.message)
    });

logger.info("Successful database connection");

const db = mongoose.connection;

module.exports = db;