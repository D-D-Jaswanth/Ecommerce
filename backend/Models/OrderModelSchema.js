const mongoose = require('mongoose')

const OrderModel = new mongoose.Schema({
    Users: {
        type: mongoose.Schema.ObjectId,
        ref: 'register'
    },
    Products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'products'
        }
    ],
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    status: {
        type: String,
        default: "Order Processing",
        enum: ["Order Processing", "Order Accepted", "Packed", "Shipped","Out For Delivery", "Delivered", "cancel"],
    },
},
    { timestamps: true }
)

const order = mongoose.model('order', OrderModel)
module.exports = order