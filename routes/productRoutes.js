const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { 
    createProduct, 
    getProductsByCategory, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

//CRUD
router.post('/', createProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
