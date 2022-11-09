import React, { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
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
      <div className="offer-presentation">
        <div className="img-element">HELLO</div>
        <div className="details-element">JE SUIS PAGE OFFER</div>
      </div>
    </>
  );
};

export default Offer;
