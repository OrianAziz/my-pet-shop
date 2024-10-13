const mongoose = require('mongoose');

// הגדרת תבנית למשתמשים
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // כתובת האימייל
  first_name: { type: String, required: true },
  family_name: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    floor: { type: String },
    appartement: { type: String },
    zip: { type: String, required: true }
  },
  billing_address: {
    country: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true }
  }
});

// יצירת המודל של המשתמשים על בסיס הסכמה
const User = mongoose.model('User', userSchema);

module.exports = User;
