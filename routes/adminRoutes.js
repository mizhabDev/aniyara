const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController/pageController');



// Admin Routes page loading

router.get('/', adminController.getloginPage);
router.get('/dashboard', adminController.getAdminPage);
router.get('/customers', adminController.getCustomersPage);
router.get('/message', adminController.getMessagePage);
router.get('/orders', adminController.getOrderPage);
router.get('/products', adminController.getProductPage);
router.get('/settings', adminController.getSettingsPage);
router.get('/transaction', adminController.getTransactionPage);
router.get('/discount', adminController.getDiscountPage);
router.get('/staff', adminController.getStaffPage);
router.get('/customers/:id', adminController.getCustomerDetailsModal);


// Server route (using Express)
// put metheds
router.put('/customers/:id/block',adminController.updateBlockStatus);


// post methods
router.post('/customers/add', adminController.addCustomer);




module.exports = router;
