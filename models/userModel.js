const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    שם:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    שםמשפחה:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    טלפון:{
        type:String,
        required:true,
        unique:true,
    },
    סיסמא:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);