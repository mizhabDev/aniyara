const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController/pageController');

// user controlletr for rendering pages
router.get('/', userController.getHomePage);
router.get('/toys', userController.loadToysPage);
router.get('/gifts', userController.loadGiftsPage);
router.get('/jewelry', userController.loadJewelryPage);
router.get('/decorations', userController.loadDecorationsPage);
router.get('/about', userController.loadAboutPage);
router.get('/contact', userController.loadContactPage);
router.get('/cosmetics', userController.loadCosmeticsPage);
router.get('/others', userController.loadOthersPage);
router.get('/perfumes', userController.loadPerfumePage);
router.get('/cart', userController.loadCartPage);
router.get('/checkout', userController.loadCheckoutPage);
router.get('/pnf', userController.loadPnfPage);

module.exports = router;
