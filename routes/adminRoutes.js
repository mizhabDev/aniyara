const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController/adminController');


// Admin Routes page loading

router.get('/',adminController.getAdminPage);
router.get('/customers',adminController.getCustomersPage);
router.get('/message',adminController.getMessagePage);
router.get('/orders',adminController.getOrderPage);
router.get('/products',adminController.getProductPage);
router.get('/settings',adminController.getSettingsPage);
router.get('/transaction',adminController.getTransactionPage);

module.exports = router;
