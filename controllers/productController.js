const Product = require('../models/productsModel');
const path = require('path');

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
        const category = req.params.category;
        const products = await Product.find({ category: category });
        
        const categoryData = {
            cats: { title: 'חתולים', banner: '/images/catban.jpg' },
            dogs: { title: 'כלבים', banner: '/images/dogban.jpg' },
            rodents: { title: 'מכרסמים', banner: '/images/rodentsban.jpg' },
            birds: { title: 'ציפורים', banner: '/images/birdban.jpg' },
            fish: { title: 'דגים', banner: '/images/fishban.jpg' }
        };

        if (categoryData[category]) {
            res.render('products/dogs', { 
                title: categoryData[category].title, 
                banner: categoryData[category].banner,
                category: category,
                currentPage: category,
                products: products
            });
        } else {
            res.status(404).send('Category not found');
        }
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

console.log('Image path:', path.join(__dirname, '..', 'public', 'images', 'catban.jpg'));
