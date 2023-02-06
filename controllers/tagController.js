const tagModel = require("../models/tagModel");
const blogModel = require("../models/blogModal");

const addTags = async (req, res) => {
  const { tags } = req.body;
  if (tags) {
    const saveTags = new tagModel({ tags: tags });
    await saveTags.save();
    res.status(200).send({
      baseResponse: { status: 1, msg: "Tag Added Successfully" },
      response: { tags },
    });
  } else {
    res
      .status(200)
      .send({ baseResponse: { status: 0, msg: "Tags are not added" } });
  }
};
module.exports = { addTags };
