const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json({ message: " authorization required" });
  }

  //get token
  const token = authorization.split(" ")[1];
  try {
    //verify
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    // find user by _id
    req.user = await User.findOne({ _id }).select("_id");
    console.log(req.user._id);
    next();
  } catch (error) {
    res.status(401).json({ message: "request is not authorized" });
  }
};

module.exports = requireAuth;
