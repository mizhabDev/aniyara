// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const { upload, cloudinary } = require('../config/cloudinary');
const Product = require('../models/productSchema')

// Upload single image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'product_images',
            transformation: [
                {
                    width: 300,
                    height: 300,
                    crop: "fill",        // Ensures image fills the dimensions
                    gravity: "auto",     // AI-based object detection for focus
                    quality: "auto:best",// High-quality compression
                    fetch_format: "auto" // Automatically chooses best format (like WebP)
                }
            ]
        });

        // Delete the file from local storage
        fs.unlinkSync(req.file.path);

        console.log('Upload successful:', result);

        res.json({
            success: true,
            imageUrl: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Upload error:', error);

        // Try to delete the local file if it exists
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                console.error('Error deleting local file:', e);
            }
        }

        res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
});

// Add this to your product routes
router.post('/products', async (req, res) => {
    try {
        const {
            name,
            price,
            stock,
            category,
            description,
            imageUrl,
            imagePublicId
        } = req.body;

        const productData = {
            name,
            price: Number(price),
            stock: Number(stock),
            category,
            description,
            image: {
                url: imageUrl,
                public_id: imagePublicId,
                alt: `Image of ${name}` // Generate alt text automatically
            }
        };

        const product = new Product(productData);
        await product.save();

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});














// Delete image from Cloudinary - FIXED ROUTE PATH TO MATCH CLIENT
router.delete('/upload/delete/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        console.log('Delete request received for:', publicId);

        const deleteId = await Product.findOne({ _id: publicId });
        console.log("consoling deleting id details", deleteId.image.public_id, "------------------");

        // Try to delete with the exact publicId provided first
        let result = await cloudinary.uploader.destroy(deleteId.image.public_id);
        console.log('First delete attempt result:', result);

        // If that fails, try with product_images/ prefix
        if (result.result !== 'ok' && !publicId.includes('product_images/')) {
            const fullPublicId = `product_images/${deleteId.image.public_id}`;
            console.log('First attempt failed, trying with prefix:', fullPublicId);
            result = await cloudinary.uploader.destroy(fullPublicId);

        }


        console.log('Final delete result:', result);

        if (result.result === 'ok') {
            res.json({ success: true, message: 'Image deleted successfully' });


            // delete form Product.db
            const dlt = await Product.findByIdAndDelete(publicId)
            console.log("consoling deleting id details", dlt, "------------------");
            if (dlt) {
                console.log("Product deleted successfully");
            } else {
                console.log("Product not found");
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to delete image',
                details: result
            });
        }
    } catch (err) {
        console.error('Error deleting from Cloudinary:', err);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: err.message
        });
    }
});















// Fetch image details (optional)
router.get('/image/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const result = await cloudinary.api.resource(publicId);
        res.json(result);
    } catch (error) {
        console.error('Error fetching image details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch image details',
            error: error.message
        });
    }
});

module.exports = router;