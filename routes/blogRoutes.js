const express = require("express");
const {
  addBlogs,
  getAllBlogs,
  getBlogsByUserId,
  addBlogToFav,
} = require("../controllers/addBlog");
const upload = require("../middlewares/multerMiddleware");
const router = express.Router();
//public routes
router.get("/getallblogs", getAllBlogs);
//private routes
router.post("/createblog", upload, addBlogs);
router.get("/getblogsbyid/:userid", getBlogsByUserId);
router.post("/addtofav/:userid/:blogid", addBlogToFav);
module.exports = router;
