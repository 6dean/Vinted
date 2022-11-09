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
          return (
            <div className="sell-card">
              <div className="product-name">{elem.product_name}</div>
              <>{console.log(elem.owner)}</>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
