const express = require("express");
const { createUser } = require("../controllers/usersController");
const router = exppress.Router();
router.post("/register", createUser);

router.post('/register')
    //registerUser)
module.exports = router;