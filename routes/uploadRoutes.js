// //image upload routers

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { storage } = require('../config/cloudinary');
// const cloudinary = require('../utils/cloudinaryUtils.js')

// const upload = multer({ storage });



// // Upload single image
// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const result = await uploadToCloudinary(req.file);
//         res.json({
//             success: true,
//             imageUrl: result.url,
//             public_id: result.public_id
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// });

// // Delete image
// // In your Express backend
// router.delete('/api/upload/:publicId',cloudinary.deleteFromCloudinary);

// // Fetch image details
// router.get('/image/:public_id', async (req, res) => {
//     try {
//         const result = await fetchFromCloudinary(req.params.public_id);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch image details' });
//     }
// });

// module.exports = router;


// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { upload, cloudinary } = require('../config/cloudinary');
const cloudinaryUtils = require('../utils/cloudinaryUtils');

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
                { width: 800, crop: 'limit' }
            ]
        });
        
        // Delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            imageUrl: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
});

// Delete image from Cloudinary
router.delete('/upload/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        
        // Delete image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        
        if (result.result === 'ok') {
            res.json({ success: true, message: 'Image deleted successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Failed to delete image' });
        }
    } catch (err) {
        console.error('Error deleting from Cloudinary:', err);
        res.status(500).json({ success: false, message: 'Error deleting image' });
    }
});

// Fetch image details
router.get('/image/:public_id', async (req, res) => {
    try {
        const result = await cloudinaryUtils.fetchFromCloudinary(req.params.public_id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch image details' });
    }
});

module.exports = router;