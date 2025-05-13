const mongoose = require('mongoose');
const { mongoUri } = require('../config')

function connectDb() {
    mongoose.connect(mongoUri).then(() => {
        console.log('MongoDB database connection established successfully');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}

module.exports = connectDb;
