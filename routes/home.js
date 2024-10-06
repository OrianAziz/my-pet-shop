const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); // חיבור לקונטרולר

// ניתוב לדף הבית
router.get('/', homeController.getHomePage);

module.exports = router;