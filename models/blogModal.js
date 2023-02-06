const mongoose = require("mongoose");
const mongooseSerial = require("mongoose-serial");

const blogSchema = new mongoose.Schema({
  blogId: { type: String, require: true, trim: true },
  blogTitle: { type: String, require: true, trim: true },
  blogCategory: { type: Array },
  blogContent: { type: String, require: true, trim: true },
  authorName: { type: String, require: true, trim: true },
  // tag: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
blogSchema.plugin(mongooseSerial, { field: "blogId", digits: 10 });

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
