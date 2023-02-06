const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
  tags: { type: Array },
});
const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;
