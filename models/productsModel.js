const mongoose = require('mongoose');

// הגדרת הסכמה למוצר
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,

  },
  price: {
    type: Number,
    required: true,
    min: 0, 

  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,

  },
  category: {
    type: String,
    required: true,
    enum: ['dogs', 'cats', 'fish', 'birds', 'reptiles', 'rodents'] // בחירה מתוך קטגוריות מוגדרות
  },
  inventory: {
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

  colors: {
    type: [String], 
    enum: ['אדום', 'כחול', 'שחור', 'ירוק'], 
    required: true
  },

  sizes: [
    {
      size: { type: String, enum: ['קטן', 'בינוני', 'גדול'], required: true },
      weight: { type: String }, 
      price: { type: Number, required: true }, // מחיר לפי גודל
      inventory: { type: Number, required: true } // מלאי לכל גודל
    }
  ],

  status: {
    type: String,
    enum: ['זמין', 'לא זמין'],
    default: 'זמין'
  }
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
