const User = require("../Models/User");

const isMember = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    const member = await User.findOne({ token: token }).select("account");

    if (member === null) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = member;
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = isMember;
