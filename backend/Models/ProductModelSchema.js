const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const products = mongoose.model('products', ProductModel)
module.exports = products