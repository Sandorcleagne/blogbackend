const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  console.log("apihitted");
  const { name, email, password, cpassword } = req.body;
  console.log("req.body", req.body);
  const checkEmail = await UserModel.findOne({ email: email });
  if (checkEmail) {
    res
      .status(200)
      .send({ baseResponse: { status: 0, msg: "Email Already Exist" } });
  } else {
    if (name && email && password && cpassword) {
      if (password === cpassword) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
          name: name,
          email: email,
          password: hashedPassword,
        });
        await doc.save();
        const savedUser = await UserModel.findOne({ email: email });
        const token = jwt.sign(
          { userId: savedUser._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        res.status(200).send({
          baseResponse: {
            status: 1,
            msg: "User Registered Sucessfully",
          },
          response: { token: token },
        });
      } else {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "Password and confirm password is not matched",
          },
        });
      }
    } else {
      res
        .status(200)
        .send({ baseResponse: { status: 0, msg: "All feilds are required" } });
    }
  }
};
const getAllRegisteredUser = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    if (allUsers) {
      res.status(200).send({
        baseResponse: { status: 1, msg: "sucess" },
        response: { allUsers },
      });
    } else {
      res.status(400).send({
        baseResponse: { status: 0, msg: "failed" },
      });
    }
  } catch (error) {
    res.status(404).send({
      baseResponse: { status: 0, msg: "failed", response: { error } },
    });
  }
};
module.exports = { registerUser, getAllRegisteredUser };
