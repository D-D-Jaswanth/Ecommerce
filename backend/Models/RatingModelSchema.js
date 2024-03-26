const mongoose = require('mongoose')

const RatingModel = new mongoose.Schema({
    User: {
        type: mongoose.Schema.ObjectId,
        ref: 'register'
    },
    Product: {
        type: mongoose.Schema.ObjectId,
        ref: 'order'
    },
    ratingpoints: {
        type: String,
        required: true
    },
    ratingdescription: {
        type: String,
        required: true
    },
    ratingtitle: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const rating = mongoose.model('rating', RatingModel)
module.exports = rating