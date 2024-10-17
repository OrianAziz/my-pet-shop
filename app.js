const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/passport'); // Require passport instance
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const userRouter = require('./routes/userRouter');
const productRoutes = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRouth');
const homeController = require('./controllers/homeController');
const authRoutes = require('./routes/authRoutes'); // Import the new auth routes
const bcrypt = require("bcrypt")
const User = require("./models/userModel")
  
const app = express();
const port = process.env.PORT || 3003; // Fixed to uppercase PORT

dbConnect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(express.static(path.join(__dirname, 'public')));

// הגדרת express-session
app.use(session({
  secret: 'yourSecretKey', // מפתח סודי להצפנת הסשן
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // אם השרת שלך משתמש ב-HTTPS, שנה ל-true
}));

// Initialize flash middleware
app.use(flash());

// Initialize Passport after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user;
  next();
});

// Routes
app.get('/dogs', homeController.dogsPage);
app.use('/', homeRoutes);
app.use('/api/user', userRouter);
app.use('/products', productRoutes);
app.use('/auth', authRoutes); // Use the new auth routes for login/signup

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
