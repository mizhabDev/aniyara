
// This is the product model for our application. It defines the structure of the product data in the database.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['gift', 'fancy', 'decoration', 'toy'], // 👈 based on your items
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String, // later we can store image URLs
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
