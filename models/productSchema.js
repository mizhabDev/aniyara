
// This is the product model for our application. It defines the structure of the product data in the database.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // 👈 this should be the name of your category mode l
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  productOffer: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },  
  color: {
    type: String,
    required: true,
  },
  productImage: {
    type: [String],
    required: true,
  },
  isBlocked: { 
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Available', 'Out of Stock', 'Discontinued'],
    default: 'Available',
    required: true,
  },

  
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
