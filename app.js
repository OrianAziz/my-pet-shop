const express = require('express');
//const mongoose = require('mongoose');
const app = express();
const path = require('path');

//mongoose.connect('mongodb://localhost:27017')

const homeController = require('./controllers/homeController');
// הגדרת תיקייה סטטית (ל-CSS, JS, תמונות וכו')
app.use(express.static(path.join(__dirname, 'public')));

// ניתוב לעמוד הבית
app.get('/', homeController.getHomePage);
const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
