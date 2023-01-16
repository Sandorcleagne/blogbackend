const mongoose = require("mongoose");
const mongooseSerial = require("mongoose-serial");
const userSchema = new mongoose.Schema({
  userId: { type: String, require: true, trim: true },
  name: { type: String, require: true, trim: true },
  email: { type: String, require: true, trim: true },
  password: { type: String, require: true, trim: true },
});
userSchema.plugin(mongooseSerial, { field: "userId", digits: 7 });
const UserModel = mongoose.model("registerdUser", userSchema);
module.exports = UserModel;
