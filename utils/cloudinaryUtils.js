//cloudinaryUtils.js
const { cloudinary } = require('../config/cloudinary');

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'myUploads',
            resource_type: 'auto'
        });
        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};

// In your Express backend
const deleteFromCloudinary= async (req, res) => {
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
};

const fetchFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.api.resource(public_id);
        return result;
    } catch (error) {
        console.error('Error fetching from Cloudinary:', error);
        throw new Error('Failed to fetch image');
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
    fetchFromCloudinary
};