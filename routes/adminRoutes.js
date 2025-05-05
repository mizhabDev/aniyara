const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController/pageController');
const User = require('../models/userModel'); // Adjust the path as necessary


// Admin Routes page loading

router.get('/',adminController.getloginPage);
router.get('/dashboard',adminController.getAdminPage);
router.get('/customers',adminController.getCustomersPage);
router.get('/message',adminController.getMessagePage);
router.get('/orders',adminController.getOrderPage);
router.get('/products',adminController.getProductPage);
router.get('/settings',adminController.getSettingsPage);
router.get('/transaction',adminController.getTransactionPage);
router.get('/discount',adminController.getDiscountPage);
router.get('/staff',adminController.getStaffPage);

router.get('/customers/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add any additional user data you want to send
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            totalOrders: user.totalOrders || 0,
            totalSpent: user.totalSpent || 0,
            // Add more fields as needed
        }; 

        res.json(userData);
        console.log("this from admin routes",userData);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
