const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const port = process.env.port || 3003;
const userRouter = require('./routes/userRouter');
const productController = require('./controllers/productController');
const homeRoutes = require('./routes/homeRouth');
const homeController = require('./controllers/homeController');
const productRoutes = require('./routes/productRoutes'); 


dbConnect();

app.set('view engine', 'ejs');

app.get('/dogs', homeController.dogsPage);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRoutes);
app.use("/api/user", userRouter);
app.use('/products', productRoutes); // Link product routes to /products

app.set('views', path.join(__dirname, 'views')); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
