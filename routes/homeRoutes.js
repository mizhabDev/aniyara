const express = require('express');
const router = express.Router();
const homeController = require('../controllers/userController/homeController');
router.get('/', homeController.getHomePage);

module.exports = router;
