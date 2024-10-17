const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport'); // Require passport instance
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const userRouter = require('./routes/userRouter');
const homeController = require('./controllers/homeController');
const authRoutes = require('./routes/authRoutes'); // Import the new auth routes
const cartRoutes = require('./routes/cartRoutes'); // Import the cart routes
const cartController = require('./controllers/cartController'); // Import the cart controller
const orderRoutes = require('./routes/orderRoutes');
const mockAuth = require('./middleware/mockAuth');
const productRoutes = require('./routes/productRoutes');
const userController = require('./controllers/userController');

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
app.get('/', (req, res) => {
    res.render('petshop', { currentPage: 'home' });
});

app.use('/products', productRoutes);

app.get('/branches', (req, res) => {
    const branches = [
        { name: 'רמת גן', address: 'קריניצי 12 רמת גן', lat: 32.0684, lng: 34.8248 },
        { name: 'הרצליה', address: 'המקובלים 5 הרצליה', lat: 32.1640, lng: 34.8472 },
        { name: 'אשקלון', address: 'בלפור 18 אשקלון', lat: 31.6688, lng: 34.5715 },
        { name: 'תל אביב', address: 'ארלוזרוב 72 תל אביב', lat: 32.0853, lng: 34.7818 }
    ];
    res.render('branches', { currentPage: 'branches', branches: branches });
});

app.get('/user', mockAuth, userController.getUserArea);

app.use('/auth', authRoutes);
app.use('/cart', mockAuth, cartRoutes);

app.get('/get-cart-items', mockAuth, cartController.getCartItems);
app.post('/cart/add', mockAuth, cartController.addItemToCart);
app.post('/cart/remove', mockAuth, cartController.removeItemFromCart);

app.use('/order', mockAuth, orderRoutes);
app.use('/orders', mockAuth, orderRoutes);

app.post('/delete-order/:orderId', mockAuth, (req, res) => {
    const orderId = req.params.orderId;
    // Delete order from database
    // Redirect back to user page or send success response
    res.redirect('/user');
});

app.locals.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
