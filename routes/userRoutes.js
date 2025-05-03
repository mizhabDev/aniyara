const express = require('express');
const router = express.Router();
const pageController = require('../controllers/userController/pageController');

// user controlletr for rendering pages
router.get('/', pageController.getHomePage);
router.get('/login', pageController.loadLoginPage);
router.get('/toys', pageController.loadToysPage);
router.get('/gifts', pageController.loadGiftsPage);
router.get('/jewelry', pageController.loadJewelryPage);
router.get('/decorations', pageController.loadDecorationsPage);
router.get('/about', pageController.loadAboutPage);
router.get('/contact', pageController.loadContactPage);
router.get('/cosmetics', pageController.loadCosmeticsPage);
router.get('/others', pageController.loadOthersPage);
router.get('/perfumes', pageController.loadPerfumePage);
router.get('/cart', pageController.loadCartPage);
router.get('/checkout', pageController.loadCheckoutPage);
router.get('/pnf', pageController.loadPnfPage);
router.get('/wishlist',pageController.loadWishlistPage)
router.get('/user', pageController.loadUserPage);

router.post('/signup', pageController.signup);
router.post('/login', pageController.login);
 
module.exports = router;
