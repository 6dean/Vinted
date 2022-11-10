import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  });

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="master">
      <div className="offer-presentation">
        <div className="img-element">
          <img
            className="img-offer"
            src={
              data.product_image.secure_url
                ? data.product_image.secure_url
                : null
            }
            alt=""
          />
        </div>
        <div className="box-details">
          {" "}
          <div className="detail-price">{data.product_price} €</div>
          <div className="listing-props">
            <div className="detail-elem">
              <div className="elem-id">MARQUE</div>{" "}
              <div>{data.product_details[0]["MARQUE"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">TAILLE</div>{" "}
              <div>{data.product_details[1]["TAILLE"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">ETAT</div>{" "}
              <div>{data.product_details[2]["ÉTAT"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">COULEUR</div>
              <div>{data.product_details[3]["COULEUR"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">EMPLACEMENT</div>
              <div>{data.product_details[4]["EMPLACEMENT"]}</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="product-name">{data.product_name} </div>
          <div className="product-description">{data.product_description} </div>
          <div className="user-id-offer">
            {data.owner !== undefined &&
            data.owner.account !== undefined &&
            data.owner.account.avatar !== undefined ? (
              <img
                className="avatar-profil"
                src={data.owner.account.avatar.secure_url}
                alt=""
              />
            ) : null}
            {data.owner === undefined ? null : data.owner.account.username}
          </div>
          <div className="buy-button">
            <button>ACHETER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
