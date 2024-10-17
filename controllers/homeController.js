exports.getHomePage = (req, res) => {
    res.render('petshop');
};

exports.dogsPage = (req, res) => {
    res.render('products/dogs');
};

exports.branchesPage = (req, res) => {
    const branches = [
        { name: 'רמת גן', address: 'קריניצי 12 רמת גן', lat: 32.0684, lng: 34.8248 },
        { name: 'הרצליה', address: 'המקובלים 5 הרצליה', lat: 32.1640, lng: 34.8472 },
        { name: 'אשקלון', address: 'בלפור 18 אשקלון', lat: 31.6688, lng: 34.5715 },
        { name: 'תל אביב', address: 'ארלוזרוב 72 תל אביב', lat: 32.0853, lng: 34.7818 }
    ];
    res.render('branches', { branches });
};
