const mongoose = require('mongoose');

// הגדרת תבנית למשתמשים
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  first_name: { type: String, required: true },
  family_name: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String },
    street: { type: String },
    city: { type: String },
    floor: { type: String },
    appartement: { type: String },
    zip: { type: String }
  },
  billing_address: {
    country: { type: String },
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  }
});

// Simplify the validPassword method to do a direct string comparison
userSchema.methods.validPassword = function(password) {
  return this.password === password;
};

// יצירת המודל של המשתמשים על בסיס הסכמה
const User = mongoose.model('User', userSchema);

module.exports = User;
