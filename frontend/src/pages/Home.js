import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="img-advertise">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-tablets-up-f55440d50886e8cc9b10cbc86322e5b3b48fbfaa6b18ea09215515312e8b1715.jpg"
          alt=""
        />
      </div>
      <div>
        <Link to="/offer"> VOIR LES OFFRES </Link>
      </div>
      <div className="introduction">
        {data.offers.map((elem) => {
          console.log(elem.owner && elem.owner.account);

          return (
            <div className="sell-card">
              <div className="user-id">
                {elem.owner === undefined
                  ? "Team Reacteur"
                  : elem.owner.account.username}
              </div>
              <div className="image-container">
                <img
                  src={
                    elem.product_image.secure_url
                      ? elem.product_image.secure_url
                      : null
                  }
                  alt=""
                />
              </div>
              <div className="product-price">{elem.product_price} €</div>
              <div className="product-info">
                {elem.product_details[1]["TAILLE"]}
              </div>
              <div className="product-info">
                {elem.product_details[0]["MARQUE"]}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
