const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin} = require("../../users/controllers/verifyToken");
const {getConversation,getAllConversations,postMessage, postConversation, getAllUserConversations} = require("../controllers/")

router.use(express.json());
router.get("/get_all",getAllConversations)
router.get("/get_user/:client_id",getAllUserConversations);
router.get("/get_one/:conversation_id",getConversation);
router.post("/:conversation_id",postMessage);
router.post("/",postConversation);
module.exports = router;