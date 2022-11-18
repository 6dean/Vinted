require("dotenv").config();

const { createAgent } = require("@forestadmin/agent");
const {
  createMongooseDataSource,
} = require("@forestadmin/datasource-mongoose");
// Retrieve your mongoose connection
const connection = require("./mongoose-models");

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === "production",
})
  // Create your Mongoose datasource
  .addDataSource(createMongooseDataSource(connection))
  // Replace "myExpressApp" by your Express application
  .mountOnExpress(myExpressApp)
  .start();

const express = require("express"); // package express
const cors = require("cors"); // package cors
const mongoose = require("mongoose"); // package mongoose
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express(); // constante app utilisant express
app.use(cors());
app.use(express.json()); // utilisation format JSON

mongoose.connect(process.env.MONGODB_URI); // DB Vinted

const signupRoutes = require("./Routes/signup"); // raccourci signup
const loginRoutes = require("./Routes/login"); // raccourci login
const publishRoutes = require("./Routes/publish"); // raccourci publish

app.use(signupRoutes);
app.use(loginRoutes);
app.use(publishRoutes);

app.post("/offer/pay", async (req, res) => {
  const Offer = require("./Models/Offer");
  const stripeToken = req.body.stripeToken;
  const { id, price, description } = req.body;
  // Créer la transaction
  const response = await stripe.charges.create({
    amount: price * 100,
    currency: "eur",
    description: description,
    source: stripeToken,
  });
  console.log(response.status);
  const newDetele = await Offer.findByIdAndDelete(id);
  console.log(newDetele, "is deleted");
  res.json(response);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is now online /!\\");
});
