const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/auth");
const {verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin} = require("../controllers/verifyToken");
const {updateUser,deleteUser,getUser,getAllUsers,acceptUser,editOrderLimit} = require("../controllers/users")
const CryptoJS = require("crypto-js");

router.use(express.json());
router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/:id",updateUser);
router.delete("/:id",verifyTokenAndAdmin,deleteUser);
router.get("/:id",getUser);
router.get("/",getAllUsers);
module.exports = router;