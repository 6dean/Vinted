import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-vinted--6qn7tv96v7tt.code.run/offers"
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
      <div className="box-advertise">
        <div className="style-advertise">
          Prêts à faire du tri dans vos placards ?
        </div>
        <button className="advertise-button">Vends maintenant</button>
      </div>
      <div className="img-advertise">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
      </div>

      <div className="introduction">
        {data.map((elem) => {
          return (
            <div>
              {elem.owner !== undefined ? (
                <div className="sell-card">
                  <div className="user-id">
                    {elem.owner !== undefined &&
                    elem.owner.account !== undefined &&
                    elem.owner.account.avatar !== undefined ? (
                      <img
                        className="avatar"
                        src={elem.owner.account.avatar.secure_url}
                        alt=""
                      />
                    ) : null}
                    {elem.owner === undefined
                      ? "Team Reacteur"
                      : elem.owner.account.username}
                  </div>

                  <Link to={`/offer/${elem._id}`}>
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
                  </Link>

                  <div className="product-price">{elem.product_price} €</div>
                  <div className="product-info">
                    {elem.product_details[1]["TAILLE"]}
                  </div>
                  <div className="product-info">
                    {elem.product_details[0]["MARQUE"]}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
