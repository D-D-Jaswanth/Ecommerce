const mongoose = require('mongoose')

const RegisterModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

const register = mongoose.model('register', RegisterModel)
module.exports = register