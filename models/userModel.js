const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // נדרשת לצורך הצפנה והשוואת סיסמאות

// הגדרת תבנית למשתמשים
const userSchema = new mongoose.Schema({
  //email: { type: String, required: true, unique: true },  // כתובת האימייל
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


// הוספת פונקציה להשוואת הסיסמה שהוזנה לסיסמה המוצפנת
userSchema.methods.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// הוספת פונקציה לפני שמירת הסיסמה כדי להצפין אותה
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// יצירת המודל של המשתמשים על בסיס הסכמה
const User = mongoose.model('User', userSchema);

module.exports = User;