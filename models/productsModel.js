const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    שםהמוצר: {
        type: String,
        required: true,
        minlength: [3, 'שם המוצר חייב להיות לפחות 3 תווים'], 
        maxlength: [100, 'שם המוצר יכול להיות עד 100 תווים'] 
    },
    מחיר: {
        type: Number,
        required: [true, 'מחיר המוצר הוא שדה חובה'], 
        min: [0, 'המחיר חייב להיות מספר חיובי'],         
    },
    תיאור: {
        type: String,
        required: [true, 'תיאור המוצר הוא שדה חובה'], 
        minlength: [10, 'תיאור חייב להיות לפחות 10 תווים'], 
        maxlength: [500, 'תיאור יכול להיות עד 500 תווים'] 
    },
    קטגוריה: {
        type: String,
        required: true,
        enum: ['Dogs', 'Cats', 'Fish', 'Birds', 'Reptiles', 'Rodents']
    },
    מלאי: {
        type: Number,
        default: 0,
        min: [0, 'המלאי חייב להיות מספר חיובי']
    },
    imageUrl: {
        type: String 
    }
});


module.exports = mongoose.model('Product', productSchema);
