const mongoose = require('mongoose');

// הגדרת תבנית למשתמשים
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // כתובת האימייל
  שם_פרטי: { type: String, required: true },
  שם_משפחה: { type: String, required: true },
  סיסמא: { type: String, required: true },
  כתובת_משלוח: {
    מדינה: { type: String, required: true },
    רחוב: { type: String, required: true },
    עיר: { type: String, required: true },
    קומה: { type: String },
    דירה: { type: String },
    מיקוד: { type: String, required: true }
  },
  כתובת_חיוב: {
    מדינה: { type: String, required: true },
    רחוב: { type: String, required: true },
    עיר: { type: String, required: true },
    מיקוד: { type: String, required: true }
  }
});

// יצירת המודל של המשתמשים על בסיס הסכמה
const User = mongoose.model('User', userSchema);

module.exports = User;
