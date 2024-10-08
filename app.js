const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const port = process.env.port || 3003;
const userRouter = require('./routes/userRouter')
const productRoute = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRouth');

dbConnect();

app.get("/dogs", (req, res) => {
  res.render('products/dogs'); 
});

app.use('/', homeRoutes);
app.use("/api/user", userRouter)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
