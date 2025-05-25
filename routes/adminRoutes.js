const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController/pageController');



// Admin Routes page loading

// login page 
router.get('/', adminController.getloginPage);

//dashboard
router.get('/dashboard', adminController.getAdminPage);

// customers page  ------------------------

router.get('/customers', adminController.getCustomersPage);
router.get('/customers/:id', adminController.getCustomerDetailsModal);
router.get('/search-users', adminController.searchUsers);
router.get('/customersFetch', adminController.loadCustomerPage)

// put metheds
router.put('/customers/:id/block', adminController.updateBlockStatus);

// post methods
router.post('/customers/add', adminController.addCustomer);




// message pages   --------------------------
router.get('/message', adminController.getMessagePage);

// orders page ---------------------------
router.get('/orders', adminController.getOrderPage);

// product page ---------------------------
router.get('/products', adminController.getProductPage);
router.get('/productFetch',adminController.loadProductPage)


// settings page  -----------------------------
router.get('/settings', adminController.getSettingsPage);

// transaction page  ------------------------------
router.get('/transaction', adminController.getTransactionPage);

// discount page  ------------------------------
router.get('/discount', adminController.getDiscountPage);

//staff page  -----------------------------
router.get('/staff', adminController.getStaffPage);







module.exports = router;
