const express = require("express");
const router = express.Router();
const { registerUser, loginuser } = require("../Controller/UserController");

router.post("/signup", registerUser);
router.post("/login", loginuser);


module.exports=router;