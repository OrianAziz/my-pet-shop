const express = require('express');
const { 
    createProduct, 
    getProductsByCategory, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const router = express.Router();

//CRUD
router.post('/', createProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
