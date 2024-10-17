const express = require('express');
const passport = require('passport');
const User = require('../models/userModel'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const authController = require('../controllers/authController');

// GET Login page
router.get('/login', authController.loginPage);

// POST Login
router.post('/login', (req, res, next) => {
  console.log('Login attempt:', req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.redirect('/auth/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }
      console.log('User authenticated successfully:', user);
      return res.redirect('/');
    });
  })(req, res, next);
});

// GET Signup page
router.get('/signup', authController.signupPage);

// POST Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, first_name, family_name } = req.body;
    
    const existingUser = await User.findById(email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({
      _id: email,
      first_name,
      family_name,
      password // This will now be stored as a plain string
    });

    await newUser.save();
    console.log('New user created:', { ...newUser.toObject(), password: '[REDACTED]' });

    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).send('Error creating user');
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

router.get('/verify-password/:email/:password', async (req, res) => {
  try {
    const user = await User.findById(req.params.email);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    const isValid = await user.validPassword(req.params.password);
    res.send(`Password valid: ${isValid}`);
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).send('Error verifying password');
  }
});

module.exports = router;
