
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    wallet: {
        type: Number,
        default: 0,
    },
    wishList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WishList',
    },
    orderHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    referralCode: {
        type: String,
        unique: true,
        sparse: true,
    },
    redeemed: {
        type: Boolean,
        default: false,
    },
    remeedmedUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    searchHistory: {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        brand: {
            type: String
        },
        searchOn: {
            type: Date,
            default: Date.now,
        },

    }
});

module.exports = mongoose.model('User', userSchema);