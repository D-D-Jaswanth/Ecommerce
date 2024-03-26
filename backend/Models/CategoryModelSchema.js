const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})

const categories = mongoose.model('categories', CategoryModel)
module.exports = categories