const express = require("express");
const {register,login,getAllUsers, getUser,deleteUser, deleteAllUser,updateUser,searchUser}  = require("../controller/user.js")
const {jwtToken} = require("../utils/generateToken.js")
const router = express.Router();

router.post("/register",register);
router.post("/login",login)

router.get("/getAllUsers",getAllUsers)
router.get("/getUser",jwtToken().verifyToken,getUser)
router.get("/searchUser",searchUser)

router.put("/updateUser",jwtToken().verifyToken,updateUser)

router.get("/deleteUser",jwtToken().verifyToken,deleteUser)
router.get("/deleteAllUsers",jwtToken().verifyToken,deleteAllUser)

module.exports = router
