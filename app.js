const express = require('express');
const mongoose = require('mongoose')
const app = express();


app.get('/', (req, res) => {
  res.send('Welcome to My Pet Shop!');
});

mongoose.connect('mongodb://localhost:27017')


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
