const cloudinary = require("cloudinary").v2;

cloudinary.config({
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SECURE: true,
});

module.exports = cloudinary;
