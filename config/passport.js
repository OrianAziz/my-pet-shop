const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // חיפוש המשתמש לפי ה-_id (שהוא האימייל)
      const user = await User.findById(email); // שימוש ב-findById כדי לחפש לפי _id
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      // בדיקת הסיסמה באמצעות הפונקציה validPassword
      const isPasswordValid = await user.validPassword(password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user); // אם הכל תקין, המשתמש מחובר
    } catch (err) {
      return done(err);
    }
  }
));

// סידור המשתמש לסשן על בסיס ה-_id (האימייל)
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// שחזור המשתמש מהסשן על בסיס ה-_id (האימייל)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // שימוש ב-findById כדי לחפש לפי _id
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
