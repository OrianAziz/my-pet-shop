const Product = require('../models/productsModel');


// יצירת מוצר חדש (Create)
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה ביצירת המוצר', error });
    }
};

// קריאת רשימת מוצרים לפי קטגוריה (Read)
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת המוצרים', error });
    }
};

// קריאת מוצר לפי ID 
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'המוצר לא נמצא' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת המוצר', error });
    }
};

// עדכון מוצר לפי ID (Update)
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'המוצר לא נמצא' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בעדכון המוצר', error });
    }
};

// מחיקת מוצר לפי ID (Delete)
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'המוצר לא נמצא' });
        }
        res.status(200).json({ message: 'המוצר נמחק בהצלחה' });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה במחיקת המוצר', error });
    }
};

exports.addNewProduct = async (req, res) => {
    try {
      const newProduct = new Product({
        שםהמוצר: 'קולר לכלב',
        מחיר: 60,
        תיאור: 'קולר איכותי לכלב, מתכוונן ומתאים לכל הגדלים',
        קטגוריה: 'כלבים',
        מלאי: 100,
        צבעים: ['אדום', 'כחול', 'שחור'],
        גדלים: [
          { גודל: 'קטן', מחיר: 50, מלאי: 30 },
          { גודל: 'בינוני', מחיר: 60, מלאי: 40 },
          { גודל: 'גדול', מחיר: 70, מלאי: 30 }
        ],
        סטטוס: 'זמין'
      });
  
      await newProduct.save();
      res.status(201).send('מוצר חדש נוסף בהצלחה!');
    } catch (error) {
      res.status(500).send('שגיאה בהוספת המוצר.');
    }
  };

 

module.exports = {
    createProduct,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct
};
