const User = require("../Model/User");

const jwt = require("jsonwebtoken");

const createtoken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1hr" });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
   try {
     const user = await User.signup(email, password);
     const token = createtoken(user._id);
     res.status(200).json({ email: email, token });
   } catch (error) {
     res.status(500).json({ message: error.message });
     console.log(error.message);
   }
  console.log(req.body);
};
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createtoken(user._id);
    res.status(200).json({ email: email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginuser };
