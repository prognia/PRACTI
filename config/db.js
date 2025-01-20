const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/productDb';

function connectDb() {
    mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB", error));
}

module.exports = connectDb;