const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    category: { type: String }
})

const itemModel = new mongoose.model('item', itemSchema);

module.exports = itemModel;