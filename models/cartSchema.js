const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },  
        totalPrice: {
            type: Number,
            required: true,
        },  
        status: {   
            type: String,
            enum: ['delivered', 'pending', 'cancelled'],
            default: 'pending',
            required: true,
        },
        cancellationReason: {
            type: String,
            enum: ['product damaged', 'wrong product', 'other'],
            default: none,
        },
        cancellationDate: {
            type: Date,
            default: Date.now,
        }
    }
});