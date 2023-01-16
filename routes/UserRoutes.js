const express = require("express");
const { loginUser } = require("../controllers/loginUser");
const {
  registerUser,
  getAllRegisteredUser,
} = require("../controllers/RegisterUser");
const router = express.Router();

router.post("/registeruser", registerUser);
router.get("/allusers", getAllRegisteredUser);
router.post("/loginuser", loginUser);
module.exports = router;
