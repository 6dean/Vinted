const express = require("express"); // package express
const cors = require("cors"); // package cors
const mongoose = require("mongoose"); // package mongoose
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express(); // constante app utilisant express
app.use(cors());
app.use(express.json()); // utilisation format JSON

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI); // DB Vinted

const signupRoutes = require("./Routes/signup"); // raccourci signup
const loginRoutes = require("./Routes/login"); // raccourci login
const publishRoutes = require("./Routes/publish"); // raccourci publish

app.use(signupRoutes);
app.use(loginRoutes);
app.use(publishRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.post("/offer/pay", async (req, res) => {
  // Réception du token créer via l'API Stripe depuis le Frontend
  const stripeToken = req.body.stripeToken;
  console.log(stripeToken);
  // Créer la transaction
  const response = await stripe.charges.create({
    amount: 2000,
    currency: "eur",
    description: "La description de l'objet acheté",
    // On envoie ici le token
    source: stripeToken,
  });
  console.log(response.status);

  res.json(response);
});

app.listen(process.env.PORT, () => {
  console.log("Server is now online /!\\");
});
