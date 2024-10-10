const Product = require('../models/productsModel');

// Create product (Create)
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get products by category (Read)
const getProductsByCategory = async (req, res) => {
    try {
        const cat = req.params.category; // Get category from the URL
        const products = await Product.find({ category: cat }); // Fetch products from the DB using category
        console.log('Fetched products for category:', cat, products); // Log products to confirm
        res.render('products/dogs', { products: products }); // Pass products to the dogs.ejs view
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Update product by ID (Update)
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete product by ID (Delete)
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

module.exports = {
    createProduct,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct
};
