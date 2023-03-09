const blogModel = require("../models/blogModal");
const UserModel = require("../models/user");
const addBlogs = async (req, res) => {
  const {
    blogId,
    blogTitle,
    blogCategory,
    blogContent,
    authorId,
    authorName,
    createdAt,
    updatedAt,
  } = req.body;
  console.log("req.body", req.body);
  if (blogTitle && blogContent && blogCategory && authorName) {
    const doc = new blogModel({
      blogId: blogId,
      blogTitle: blogTitle,
      blogCategory: blogCategory,
      blogContent: blogContent,
      authorId: authorId,
      authorName: authorName,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    await doc.save();
    await UserModel.findOneAndUpdate(
      { userId: authorId },
      { $push: { blogs: doc } }
    );
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
  if (blogs.length !== 0 || blogs !== undefined) {
    res.send({
      baseResponse: { status: 1, message: "sucess" },
      response: blogs,
    });
  } else {
    res.send({ baseResponse: { status: 0, message: "no blog exist" } });
  }
};
const getBlogsByUserId = async (req, res) => {
  const userId = req.params.userid;
  const blogs = await UserModel.findOne(
    { userId: userId },
    { _id: 0, blogs: 1 }
  );
  if (blogs) {
    res.send({
      baseResponse: { status: 1, message: "sucess" },
      response: blogs,
    });
  } else {
    res.send({ baseResponse: { status: 0, message: "no blog exist" } });
  }
};
const addBlogToFav = async (req, res) => {
  const userId = req.params.userid;
  const blogId = req.params.blogid;
  const blogData = await blogModel.findOne({ blogId: blogId }, {});
  const userData = await UserModel.findOne({ userId: userId });
  const favBlogsList = userData.favBlogs;
  const findingDuplicateBlogs = favBlogsList.find(
    (items) => items.blogId === blogId
  );
  try {
    if (findingDuplicateBlogs === undefined) {
      await UserModel.findOneAndUpdate(
        { userId: userId },
        { $push: { favBlogs: blogData } }
      );
      res.status(200).send({
        baseResponse: { status: 1, message: "Blog Added To Favourite" },
      });
    } else {
      res.status(200).send({
        baseResponse: {
          status: 0,
          message: "Blog is already added to favourite",
        },
      });
    }
  } catch (error) {
    res.status(200).send({
      baseResponse: {
        status: 0,
        message: "Unable to add to favourite",
        error: error,
      },
    });
  }
};
module.exports = { addBlogs, getAllBlogs, getBlogsByUserId, addBlogToFav };
