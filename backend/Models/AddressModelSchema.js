const mongoose = require('mongoose')

const AddressModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'register'
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    addresstype: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const address = mongoose.model('address', AddressModel)
module.exports = address