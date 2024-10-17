exports.getHomePage = (req, res) => {
    console.log('User in home route:', req.user);
    res.render('petshop', { user: req.user }); 
};

exports.dogsPage = (req, res) => {
    res.render('products/dogs');
};
