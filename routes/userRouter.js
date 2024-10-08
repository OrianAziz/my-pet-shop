const express = require("express");
const { createUser, updateUser, deleteUser, allUsers, getUserById } = require("../controllers/usersController");
const router = express.Router();

router.get('/users', allUsers);
router.get('/users/:id', getUserById);
router.post("/register", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;