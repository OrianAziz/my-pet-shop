const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const port = process.env.port || 3001;
const loginRouter = require('./routes/loginRouth')
dbConnect();


app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));

app.use("/",(req,res) => {
  res.send("hello from server")
});

//const homeRoutes = require('./routes/home');
//app.use('/', homeRoutes);

app.use("/api/user", loginRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
