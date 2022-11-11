import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ transferToken }) => {
  // MES USESTATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infos, setInfos] = useState(false);

  // MES VARIABLES
  const navigate = useNavigate();
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="formulaire">
      <div className="App">
        <h1>Se connecter</h1>
        {infos === false ? (
          <div className="input-block">
            <div>
              <p className="input-text">Email</p>
              <input
                className="input"
                onChange={(elem) => setEmail(elem.target.value)}
                type="email"
                placeholder="youraddress@mail.com"
                name="email"
                value={email}
              />
            </div>
            <div>
              <p className="input-text">Mot de passe</p>
              <input
                className="input"
                onChange={(elem) => setPassword(elem.target.value)}
                type="password"
                name="password"
                value={password}
              />
            </div>
            <div>
              <button
                className="logging-button"
                onClick={() => {
                  if (email === "") {
                    alert(`Your informations are not complete`);
                  } else {
                    setInfos(true);

                    const data = async () => {
                      try {
                        const response = await axios.post(
                          "https://lereacteur-vinted-api.herokuapp.com/user/login",
                          {
                            email: email,
                            password: password,
                          }
                        );
                        const token = response.data.token;
                        transferToken(token);
                        navigate("/");
                      } catch (error) {
                        console.log(error.message);
                      }
                    };
                    data();
                  }
                }}
              >
                Se connecter
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="product-description">
              Vos identifiants sont incorrects, réessayez
            </p>
            <button onClick={refreshPage}>Retry</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
