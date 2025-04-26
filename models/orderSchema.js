const mongoose = require('mongoose');
const { schema } = mongoose;
const {v4: uuidv4} = require('uuid');

const orderSchema = new schema({
    orderId: {
        type: String,
        default: ()=>uuidv4,
        unique: true
    },
    orderedItems: [{

        productId: {
            type: mongoose.SchemaTypeOptions.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: true
    },  
    address: {
        type: mongoose.SchemaTypeOptions.ObjectId,
        ref: 'User',
        required: true
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending','Processing','Shipped', 'Delivered', 'Cancelled', 'Returned','Return Request'],
        default: 'Pending'
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    couponApplied: {
        type: Boolean,
        default: false
    },

}, );

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
