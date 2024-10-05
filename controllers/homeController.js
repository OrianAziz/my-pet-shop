const path = require('path');

// פונקציה להצגת עמוד הבית
exports.getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'petshop.html'));
};
