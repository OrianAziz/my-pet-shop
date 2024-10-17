const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findById(email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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
