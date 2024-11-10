const express = require("express");
const router = express.Router()
const {getFiles,getFile} = require("../controllers")

router.get("/",getFiles);
router.post("/get_file",express.json(),getFile)

module.exports = router;