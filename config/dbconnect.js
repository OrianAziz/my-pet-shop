const mongoose = require('mongoose');
require('dotenv').config();  

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // יציאה אם יש שגיאה
    }
};

module.exports = dbConnect;
