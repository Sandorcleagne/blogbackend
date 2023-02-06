const blogModel = require("../models/blogModal");

const addBlogs = async (req, res) => {
  const {
    blogId,
    blogTitle,
    blogCategory,
    blogContent,
    // tag,
    authorName,
    createdAt,
    updatedAt,
  } = req.body;
  if (blogTitle && blogContent && blogCategory && authorName) {
    const doc = new blogModel({
      blogId: blogId,
      blogTitle: blogTitle,
      blogCategory: blogCategory,
      blogContent: blogContent,
      // tag: tag,
      authorName: authorName,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    await doc.save();
    res.status(200).send({
      baseResponse: { status: 1, message: "Blog Uploaded Sucessfully" },
    });
  } else {
    res.status(200).send({
      baseResponse: { status: 0, message: "All feilds are required" },
    });
  }
};
const getAllBlogs = async (req, res) => {
  const blogs = await blogModel.find({});
  console.log(blogs);
  if (blogs.length === 0 || blogs === undefined) {
    res.send({
      baseResponse: { status: 1, message: "sucess" },
      response: blogs,
    });
  } else {
    res.send({ baseResponse: { status: 0, message: "no blog exist" } });
  }
};
module.exports = { addBlogs, getAllBlogs };
