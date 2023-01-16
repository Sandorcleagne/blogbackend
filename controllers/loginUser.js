const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "30d",
            }
          );
          res.status(200).send({
            baseResponse: { status: 1, msg: "logged in sucessfully" },
            response: { user, token },
          });
        } else {
          res.status(400).send({
            baseResponse: { status: 0, msg: "credentials doesn't match" },
          });
        }
      } else {
        res
          .status(400)
          .send({ baseResponse: { status: 0, msg: "User not exist" } });
      }
    } else {
      res
        .status(400)
        .send({ baseResponse: { status: 0, msg: "All feilds are required" } });
    }
  } catch (error) {
    res.status(400).send({
      baseResponse: { status: 0, msg: "unable to login" },
      response: { error },
    });
  }
};

module.exports = { loginUser };
