

exports.getHomePage = (req, res) => {
    res.render('petshop'); 
};

exports.dogsPage = (req, res) => {
    res.render('products/dogs');
};