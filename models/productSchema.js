
// // This is the product model for our application. It defines the structure of the product data in the database.

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productName: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   // brand: {
//   //   type: String,
//   //   required: true,
//   // },
//   // category: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Category', // 👈 this should be the name of your category model
//   //   required: true,
//   // },
//   // regularPrice: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // salePrice: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // productOffer: {
//   //   type: String,
//   //   required: true,
//   // },
//   quantity: {
//     type: Number,
//     default: 0,
//   },  
//   color: {
//     type: String,
//     required: true,
//   },
//   productImage: {
//     type: [String],
//     required: true,
//   },
//   isBlocked: { 
//     type: Boolean,
//     default: false,
//   },
//   // status: {
//   //   type: String,
//   //   enum: ['Available', 'Out of Stock', 'Discontinued'],
//   //   default: 'Available',
//   //   required: true,
//   // },
//   prize:{
//     type:Number,
//     required:true,
//   }

  
// },{timestamps: true});

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;



// 1. First, let's create/modify your Product schema in models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  // Store image details
  image: {
    url: String,        // The secure_url from Cloudinary
    public_id: String,  // The public_id from Cloudinary for deletion later
    alt: String         // Alternative text for accessibility
  },
  // You can expand this to support multiple images
  additionalImages: [
    {
      url: String,
      public_id: String,
      alt: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);