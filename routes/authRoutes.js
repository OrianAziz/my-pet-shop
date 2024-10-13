const express = require('express');
const passport = require('passport');
const User = require('../models/userModel'); // Adjust the path as needed
const router = express.Router();

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

    // Here you would hash the password before saving it (use bcrypt)
    const newUser = new User({ _id: email, first_name, family_name, password });
    await newUser.save();

    res.redirect('/auth/login'); // Redirect to login after signup
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
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
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
  })
);

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/'); // Redirect to home after logout
});

module.exports = router;
