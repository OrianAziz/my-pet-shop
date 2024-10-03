const express = require('express');
const app = express();

// נתיב ברירת מחדל - דף הבית
app.get('/', (req, res) => {
  res.send('Welcome to My Pet Shop!');
});

// השרת מאזין בפורט 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
