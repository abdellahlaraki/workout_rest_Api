const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userschema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userschema.statics.signup = async function (email, password) {
  const Isexist = await this.findOne({ email });
  if (Isexist) {
    throw new Error("Email already exist");
  }
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedpassword });
  return user;
};

userschema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("email is not valid");
  }
  const ispassword = await bcrypt.compare(password, user.password);
  if (!ispassword) {
    throw new Error("password is not valid");
  }
  return user;
};

module.exports = mongoose.model("User", userschema);
