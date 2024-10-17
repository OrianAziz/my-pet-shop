const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
    res.render('login'); // Assuming you have a 'login.ejs' file in your 'views' directory
};

exports.signupPage = (req, res) => {
    res.render('signup'); // Assuming you have a 'login.ejs' file in your 'views' directory
};
