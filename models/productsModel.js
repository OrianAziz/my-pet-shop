const mongoose = require('mongoose');

// הגדרת הסכמה למוצר
const productSchema = new mongoose.Schema({
  שםהמוצר: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,

  },
  מחיר: {
    type: Number,
    required: true,
    min: 0, 

  },
  תיאור: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,

  },
  קטגוריה: {
    type: String,
    required: true,
    enum: ['כלבים', 'חתולים', 'דגים', 'ציפורים', 'זוחלים', 'מכרסמים'] // בחירה מתוך קטגוריות מוגדרות
  },
  מלאי: {
    type: Number,
    default: 0,
    min: 0
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(v); 
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },

  צבעים: {
    type: [String], 
    enum: ['אדום', 'כחול', 'שחור', 'ירוק'], 
    required: true
  },

  גדלים: [
    {
      גודל: { type: String, enum: ['קטן', 'בינוני', 'גדול'], required: true },
      משקל: { type: String }, 
      מחיר: { type: Number, required: true }, // מחיר לפי גודל
      מלאי: { type: Number, required: true } // מלאי לכל גודל
    }
  ],

  סטטוס: {
    type: String,
    enum: ['זמין', 'לא זמין'],
    default: 'זמין'
  }
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
