const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("../Utilities/cloudinary");
const isMember = require("../middlewares/isMember");

const Offer = require("../Models/Offer");

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};
router.post("/offer/publish", isMember, fileUpload(), async (req, res) => {
  try {
    const raw = req.files.image;
    const IMG = convertToBase64(raw);
    const upLoad = await cloudinary.uploader.upload(IMG, {
      folder: "/Vinted/offers",
    });

    const { name, description, price, quality, city, brand, size, color } =
      req.body;

    const newOffer = new Offer({
      product_name: name,
      product_description: description,
      product_price: price,
      product_details: [{ brand }, { size }, { quality }, { color }, { city }],
      owner: req.user,
      product_image: { secure_url: upLoad.secure_url },
    });

    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/offers", async (req, res) => {
  try {
    const filters = {};
    const { title, priceMin, priceMax, sort, page } = req.query;

    if (title) {
      const regExp = new RegExp(req.query.title, "i");
      filters.product_name = regExp;
    }
    if (Number(priceMin) > Number(priceMax)) {
      return res.status(406).json("Revois tes cours de math");
    }
    if (priceMin && priceMax) {
      console.log("OK");
      filters.product_price = {
        $gte: priceMin,
        $lte: priceMax,
      };
    }

    if (priceMin && !priceMax) {
      filters.product_price = { $gte: Number(priceMin) };
    }
    if (priceMax && !priceMin) {
      filters.product_price = { $lte: Number(priceMax) };
    }

    const sortObj = {};
    // console.log(sort);
    // if ((sort === "price-asc", "price-desc")) {
    //   return res.status(418).json("Choose only one sort");
    // }
    if (sort === "price-asc") {
      sortObj.product_price = "asc";
    } else if (sort === "price-desc") {
      sortObj.product_price = "desc";
    }
    let sKip = 0;
    if (page === "1") {
      productPage = 10;
    } else {
      productPage = 10;
      sKip = productPage * Number(page) - productPage;
    }

    // NOMBRE PRODUITS * NUMERO DE LA PAGE - NOMBRE PRODUITS

    const allOffers = await Offer.find(filters)
      .sort(sortObj)
      .skip(sKip)
      .limit(productPage)
      .populate("owner", "account");

    res.status(200).json(allOffers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  try {
    const id = await Offer.findById(req.params.id);
    res.status(200).json(id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
