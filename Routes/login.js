const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../Models/User");

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const Member = await User.findOne({ email: email });
    const salt = Member.salt;
    const newHash = SHA256(salt + password).toString(encBase64);

    if (newHash === Member.hash && email === Member.email) {
      const validLogin = {
        id: Member._id,
        token: Member.token,
        account: Member.account,
      };
      return res.status(200).json(validLogin);
    } else if (newHash !== Member.hash || email !== Member.email) {
      res.status(400).json({ message: "email or password invalid" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
