const User = require('../models/userModel')

const createUser = async(req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne(email);
    if(!findUser){
        //יצירת משתמש חדש
        const newUser = User.create(req.body);
        res.json(newUser);
    }
    else {
        res.json({
            message: "המשתמש כבר קיים",
            success: false,
        });
    }

};

module.exports = { createUser };