# Vinted Backend

It is the backend of my Vinted replica made with Node.js from my first FullStack Project.

Vinted is e-commerce website and mobile. In my case, it's only the **Desktop version**.

I have created models for User and Offer.

User => Username, Email, Password, Avatar (optionnal)

Offer => Picture, , description, price, Details (Brand, size, quality etc) and bind to Owner with ID

Only Users can create an Offer.

  # Incoming Upgrades 

Offer can only receive one picture, I will allow 3 pictures per Offer.

User will be able to delete their Offer.


# Dependances 

- Express
- Express Router
- express fileUpload
- Mongoose
- uid2
- Crypto-Js SHA256
- Crypto-Js enc-base64
- Cloudinary
- CORS
- Dotenv

# Online services
<img src="https://servicenav.coservit.com/wp-content/uploads/2022/05/18-1.jpg" alt="MongoDB.icon" width="30"/> **MongoDB**
- To create my DB online 

<img src="https://cloudinary-res.cloudinary.com/image/upload/website/cloudinary_web_favicon.png" alt="Cloudinary.icon" width="30"/> **Cloudinary**

-To upload picture from User=>Avatar or Offer



<img src="https://logo.clearbit.com/https://northflank.com/" alt="Northflank.icon" width="30"/> **Northflank**
- To deplay my backend online from Github
