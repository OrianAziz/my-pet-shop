const express = require('express');
const passport = require('passport');
const User = require('../models/userModel'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// GET Login page
router.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

// POST Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect after successful login
    failureRedirect: '/auth/login', // Redirect back to login page on failure
    failureFlash: true // Enable flash messages
  })(req, res, next);
});

// GET Signup page
router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup page
});

// POST Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, first_name, family_name, password } = req.body;

    // בדיקת קיום משתמש עם אותו אימייל
    const findUser = await User.findOne({ _id: email });
    if (findUser) {
      return res.status(409).send('User with this email already exists');
    }

    // הצפנת הסיסמה לפני שמירה
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // יצירת משתמש חדש עם סיסמה מוצפנת
    const newUser = new User({
      _id: email,
      first_name,
      family_name,
      password: hashedPassword // שמירת הסיסמה המוצפנת
    });

    // שמירת המשתמש במסד הנתונים
    await newUser.save();

    // הפניה לדף התחברות לאחר רישום מוצלח
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) { // בדיקה אם המשתמש מחובר
    res.render('dashboard', { user: req.user }); // שליחת מידע המשתמש לתבנית
  } else {
    res.redirect('/login'); // אם לא מחובר, מפנה לדף התחברות
  }
});

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
  })
);

// Facebook Auth
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  })
);

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/'); // Redirect to home after logout
});

module.exports = router;
