const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const cloudinary = require('../utils/cloudinaryUtils.js')

const upload = multer({ storage });



// Upload single image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await uploadToCloudinary(req.file);
        res.json({
            success: true,
            imageUrl: result.url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Delete image
// In your Express backend
router.delete('/api/upload/:publicId',cloudinary.deleteFromCloudinary);

// Fetch image details
router.get('/image/:public_id', async (req, res) => {
    try {
        const result = await fetchFromCloudinary(req.params.public_id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image details' });
    }
});

module.exports = router;