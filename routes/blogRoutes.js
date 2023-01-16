const express = require("express");
const { addBlogs, getAllBlogs } = require("../controllers/addBlog");
const router = express.Router();
//public routes

//private routes
router.post("/createblog", addBlogs);
router.get("/getallblogs", getAllBlogs);
module.exports = router;
