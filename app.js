const express = require('express');
const mongoose = require('mongoose')
const app = express();

// נתיב ברירת מחדל - דף הבית
app.get('/', (req, res) => {
  res.send('Welcome to My Pet Shop!');
});

mongoose.connect('mongodb://localhost:27017')

// השרת מאזין בפורט 3000
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
