const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const fileUpload = require("express-fileupload");
const cloudinary = require("../Utilities/cloudinary");

const User = require("../Models/User");

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { username, email, password, newsletter } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (!username) {
      return res.status(400).json({ message: "username needed" });
    }
    if (!email) {
      return res.status(400).json({ message: "email needed" });
    } else if (emailExist !== null) {
      return res.status(400).json({ message: "email already existing" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(salt + password).toString(encBase64);
      const token = uid2(16);

      const newSignup = new User({
        email: email,
        account: {
          username: username,
        },
        newsletter: newsletter,
        token: token,
        hash: hash,
        salt: salt,
      });
      if (req.files.avatar) {
        const convertToBase64 = (file) => {
          return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
        };

        const raw = req.files.avatar;
        const IMG = convertToBase64(raw);
        const upLoad = await cloudinary.uploader.upload(IMG, {
          folder: "/Vinted/avatars",
        });

        newSignup.avatar = { secure_url: upLoad.secure_url };
      }

      await newSignup.save();

      const validSignup = {
        id: newSignup._id,
        token: token,
        email: email,
        account: { username: username },
        avatar: { secure_url: upLoad.secure_url },
      };

      res.status(200).json(validSignup);
    }
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: error });
  }
});

module.exports = router;
