const mongoose = require('mongoose'); 


var userSchema = new mongoose.Schema({
    שם:{
        type:String,
        required:true,
        unique:true,
        index:true,
        minlength: 2,  
        maxlength: 30,  
    },
    שםמשפחה:{
        type:String,
        required:true,
        unique:true,
        index:true,
        minlength: 2,  
        maxlength: 30  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'פורמט אימייל לא תקין'],  
    },
    טלפון:{
        type:String,
        required:true,
        unique:true,
        match: [/^\d{10}$/, 'פורמט מספר טלפון לא תקין'],
    },
    סיסמא:{
        type:String,
        required:true,
        minlength: 8,
        select: false,
    },
});


module.exports = mongoose.model('User', userSchema);