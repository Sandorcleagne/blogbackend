const express = require("express");
const { addTags } = require("../controllers/tagController");
const router = express.Router();

router.post("/addtags", addTags);
module.exports = router;
