const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport'); // Require passport instance
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const userRouter = require('./routes/userRouter');
const productRoutes = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRouth');
const homeController = require('./controllers/homeController');
const authRoutes = require('./routes/authRoutes'); // Import the new auth routes
const cartRoutes = require('./routes/cartRoutes'); // Import the cart routes
const cartController = require('./controllers/cartController'); // Import the cart controller
const orderRoutes = require('./routes/orderRoutes');

// Add this line to import the mock authentication
const mockAuth = require('./middleware/mockAuth');

const app = express();
const port = process.env.PORT || 3003; // Fixed to uppercase PORT

dbConnect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // Replace with a more secure secret
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/dogs', homeController.dogsPage);
app.use('/', homeRoutes);
app.use('/api/user', userRouter);
app.use('/products', productRoutes);
app.use('/auth', authRoutes); // Use the new auth routes for login/signup

// Comment out the real authentication
/*
app.use('/cart', cartRoutes); // Use the cart routes
app.get('/get-cart-items', (req, res) => {
  const items = cartController.getCartItems(req.session.cart); // Pass session cart to controller
  res.json(items); 
});
app.post('/cart/add', cartController.addItemToCart); 
app.post('/cart/remove', cartController.removeItemFromCart);
*/

// Update these routes to use mockAuth
app.use('/cart', mockAuth, cartRoutes);
app.get('/get-cart-items', mockAuth, cartController.getCartItems);
app.post('/cart/add', mockAuth, cartController.addItemToCart);
app.post('/cart/remove', mockAuth, cartController.removeItemFromCart);

// Use mockAuth for all order routes
app.use('/order', mockAuth, orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
