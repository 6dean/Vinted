import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  // MES USESTATE
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infos, setInfos] = useState(false);

  // MES VARIABLES
  const navigate = useNavigate();

  return (
    <div className="formulaire">
      <div className="App">
        <h1>Inscription</h1>
        {infos === false ? (
          <div className="input-block">
            <div>
              <p className="input-text">Nom d'Utilisateur</p>
              <input
                className="input"
                onChange={(username) => setName(username.target.value)}
                type="text"
                placeholder="Utilisateur"
                name="name"
                value={username}
              />
            </div>
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
              <p className="input-text">Password</p>
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
                className="button-join"
                onClick={() => {
                  if (username === "" || email === "") {
                    alert(`Your informations are not complete`);
                  } else {
                    setInfos(true);

                    const data = async () => {
                      try {
                        const response = await axios.post(
                          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                          {
                            email: email,
                            username: username,
                            password: password,
                            newsletter: true,
                          }
                        );
                        const token = response.data.token;
                        Cookies.set("token", token, { expires: 1 });
                        navigate("/");
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    data();
                  }
                }}
              >
                Créer un compte
              </button>
              <div className="already-member">
                Vous avez déjà un compte ?{" "}
                <Link to="/Login">
                  <span>Se connecter</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Signup;
