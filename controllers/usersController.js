const User = require('../models/userModel')


// פונקציה לשליפת כל המשתמשים 
const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת רשימת המשתמשים', error });
    }
};

// פונקציה לשליפת משתמש לפי ID 
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת המשתמש', error });
    }
};

//יצירת משתמש
const createUser = async (req, res) => {
    try {
        const { email, first_name, family_name, phone_number, password } = req.body;

        if (!email || !first_name || !family_name || !phone_number || !password) {
            return res.status(400).json({ message: 'חסר מידע הכרחי' });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({ message: 'המשתמש כבר קיים' });
        }

        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה ביצירת המשתמש', error });
    }
};

//עדכון משתמש
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בעדכון המשתמש', error });
    }
};

//מחיקת משתמש
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }

        res.json({ message: 'המשתמש נמחק בהצלחה' });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה במחיקת המשתמש', error });
    }
};

module.exports = { createUser, updateUser, deleteUser, allUsers, getUserById };