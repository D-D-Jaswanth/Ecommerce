const mongoose = require('mongoose')

const AdminModel = new mongoose.Schema({
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const admin = mongoose.model('admin', AdminModel)
module.exports = admin