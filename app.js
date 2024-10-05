const express = require('express');
//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

const homeController = require('./controllers/homeController');
app.get('/', homeController.getHomePage);


const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
