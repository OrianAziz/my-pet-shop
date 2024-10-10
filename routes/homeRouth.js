const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); // חיבור לקונטרולר
const productController = require('../controllers/productController');

// ניתוב לדף הבית
router.get('/', homeController.getHomePage);
router.get('/dogs', homeController.dogsPage);

  

module.exports = router;