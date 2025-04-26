const mongoose = require('mongoose');
const { schema } = mongoose;

const wishListSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        addedOn: {
            type: Date,
            default: Date.now,
        },
    }],
})

const WishList = mongoose.model('WishList', wishListSchema);
module.exports = WishList;


